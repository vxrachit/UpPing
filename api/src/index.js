function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

function handleOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
}

function classifyFailure(msg, code) {
  if (code >= 400 && code < 500) return "client_error";
  if (code >= 500 && code < 600) return "server_error";
  if (msg.includes("timeout") || msg.includes("AbortError")) return "timeout";
  
  if (
    msg.includes("getaddrinfo ENOTFOUND") ||
    msg.includes("ENOTFOUND") ||
    msg.includes("Name or service not known") ||
    msg.includes("No such host") ||
    msg.includes("nodename nor servname provided")
  ) {
    return "invalid_domain";
  }
  
  if (msg.includes("DNS")) return "dns_error";
  if (msg.includes("SSL") || msg.includes("certificate")) return "ssl_error";
  if (
    msg.includes("internal error; reference") ||
    msg.includes("Connection failed between Cloudflare edge and target origin")
  )
    return "cloudflare_internal_error";
  if (msg.includes("fetch failed")) return "network_error";
  return "unknown_error";
}


function buildAdvice(classification) {
  switch (classification) {
    case "invalid_domain":
      return "This is not a valid website address. Please check the spelling.";
    case "dns_error":
      return "The domain name could not be resolved. Verify DNS records.";
    case "ssl_error":
      return "SSL handshake failed. Check the certificate configuration.";
    case "timeout":
      return "The site took too long to respond. Possibly under heavy load.";
    case "client_error":
      return "Client-side error (4xx). Verify the request or endpoint.";
    case "server_error":
      return "Server-side error (5xx). The server may be down.";
    case "cloudflare_internal_error":
      return "Cloudflare edge could not connect to the target. Check SSL/DNS.";
    case "network_error":
      return "Network unreachable or blocked by target.";
    default:
      return null;
  }
}

function buildReason(classification) {
  const map = {
    invalid_domain: "invalid_domain",
    dns_error: "dns_unreachable",
    ssl_error: "ssl_failure",
    timeout: "timeout",
    client_error: "client_error",
    server_error: "server_error",
    cloudflare_internal_error: "edge_unreachable",
    network_error: "network_unreachable",
    none: "ok",
  };
  return map[classification] || "unknown";
}

function computeHealthScore(statusCode, classification, responseTime) {
  if (classification === "invalid_domain" || classification === "dns_error" || classification === "cloudflare_internal_error")
    return 0;
  if (classification === "ssl_error" || classification === "timeout" || classification === "network_error")
    return 25;
  if (statusCode >= 500) return 40;
  if (statusCode >= 400) return 60;
  if (statusCode === 200) {
    if (responseTime < 500) return 100;
    if (responseTime < 1000) return 90;
    if (responseTime < 2000) return 75;
    return 60;
  }
  return 50;
}

async function fetchWithRedirectTrace(url, timeoutMs = 10000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  let currentUrl = url;
  const redirects = [];

  let res;
  let redirectCount = 0;
  let ttfb = 0;

  try {
    const ttfbStart = performance.now();
    res = await fetch(currentUrl, { method: "HEAD", redirect: "manual", signal: controller.signal });
    ttfb = Math.round(performance.now() - ttfbStart);
  } catch {
    const retryStart = performance.now();
    res = await fetch(currentUrl, {
      method: "GET",
      redirect: "manual",
      signal: controller.signal,
      headers: { Range: "bytes=0-0" },
    });
    ttfb = Math.round(performance.now() - retryStart);
  }

  while (res.status >= 300 && res.status < 400 && redirectCount < 10) {
    const location = res.headers.get("location");
    if (!location) break;
    const nextUrl = new URL(location, currentUrl).toString();
    redirects.push({ from: currentUrl, to: nextUrl, code: res.status });
    currentUrl = nextUrl;
    
    const redirectStart = performance.now();
    res = await fetch(currentUrl, { method: "HEAD", redirect: "manual", signal: controller.signal });
    ttfb = Math.round(performance.now() - redirectStart);
    redirectCount++;
  }

  clearTimeout(timeout);
  return { res, finalUrl: currentUrl, redirects, ttfb };
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return handleOptions();

    if (url.pathname === "/api/health")
      return jsonResponse({ ok: true, version: "1.0", timestamp: new Date().toISOString() });

    if (url.pathname === "/api/check") {
      const target = url.searchParams.get("url");
      if (!target) return jsonResponse({ error: "Missing ?url parameter" }, 400);

      let parsed;
      try {
        parsed = new URL(target.includes("://") ? target : `https://${target}`);
      } catch {
        const classification = "invalid_domain";
        return jsonResponse({
          error: "Invalid URL",
          classification,
          reason: buildReason(classification),
          advice: buildAdvice(classification),
          healthScore: 0,
        }, 400);
      }

      if (!parsed.hostname.includes(".") || parsed.hostname.endsWith(".")) {
        const classification = "invalid_domain";
        return jsonResponse({
          error: "Invalid domain name",
          classification,
          reason: buildReason(classification),
          advice: buildAdvice(classification),
          healthScore: 0,
        }, 400);
      }

      const cache = caches.default;
      const cacheKey = new Request(parsed.toString());
      const cached = await cache.match(cacheKey);
      if (cached) {
        const data = await cached.json();
        data.cached = true;
        return jsonResponse(data);
      }

      let statusCode = null,
        sslStatus = "unknown",
        error = null,
        classification = null,
        responseHeaders = {},
        finalUrl = parsed.toString(),
        redirects = [],
        responseSize = 0,
        ttfb = 0,
        responseTime = 0;

      const start = performance.now();
      
      try {
        const { res, finalUrl: fUrl, redirects: chain, ttfb: firstByte } = await fetchWithRedirectTrace(parsed.toString(), 10000);
        const end = performance.now();
        responseTime = Math.round(end - start);
        
        statusCode = res.status;
        finalUrl = fUrl;
        redirects = chain;
        responseHeaders = Object.fromEntries(res.headers);
        responseSize = parseInt(res.headers.get("content-length") || "0");
        sslStatus = parsed.protocol === "https:" ? "valid" : "no SSL";
        ttfb = firstByte;
      } catch (err) {
        const end = performance.now();
        responseTime = Math.round(end - start);
        
        let msg = err.message || "";
        
        if (msg.includes("internal error; reference") || 
            msg.includes("Connection failed between Cloudflare edge and target origin")) {
          error = "Domain does not exist or cannot be resolved";
          classification = "invalid_domain";
        } else {
          error = msg;
          classification = classifyFailure(msg, statusCode);
        }
      }
      const redirectCount = redirects.length;

      if (!classification && statusCode >= 400) classification = classifyFailure("", statusCode);

      const reason = buildReason(classification || "none");
      const advice = buildAdvice(classification);
      const healthScore = computeHealthScore(statusCode, classification, responseTime);

      const data = {
        requestedUrl: parsed.toString(),
        finalUrl,
        redirected: redirectCount > 0,
        redirectCount,
        redirectChain: redirects,
        statusCode,
        responseTime,
        ttfb,
        sslStatus,
        contentType: responseHeaders["content-type"] || null,
        responseSize,
        classification: classification || (error ? "unknown_error" : "Success"),
        reason,
        error: error ? error.toString() : null,
        advice,
        healthScore,
        cached: false,
        checkedAt: new Date().toISOString(),
      };

      ctx.waitUntil(
        cache.put(cacheKey, new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } }), {
          expirationTtl: 60,
        })
      );

      return jsonResponse(data);
    }

    return jsonResponse({ error: "Not found" }, 404);
  },
};
