import { useState } from 'react';
import { Search, AlertCircle, Loader2, CheckCircle, Shield, Clock, TrendingUp, Globe } from 'lucide-react';
import { checkWebsite, CheckResponse } from '../lib/api';
import { ResultCard } from '../components/ResultCard';
import { RecentChecks } from '../components/RecentChecks';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface RecentCheck {
  url: string;
  timestamp: string;
  status: string;
}

export const Home = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<CheckResponse | null>(null);
  const [recentChecks, setRecentChecks] = useLocalStorage<RecentCheck[]>('recentChecks', []);

  const validateUrl = (input: string): boolean => {
    if (!input.trim()) {
      setError('Please enter a URL');
      return false;
    }

    const trimmedInput = input.trim();

    if (trimmedInput.length < 3) {
      setError('Please enter a valid URL (e.g., upping.vxrachit.is-a.dev)');
      return false;
    }

    const invalidChars = /[<>{}[\]\\^`|]/;
    if (invalidChars.test(trimmedInput)) {
      setError('URL contains invalid characters');
      return false;
    }

    try {
      const urlToTest = trimmedInput.startsWith('http://') || trimmedInput.startsWith('https://') 
        ? trimmedInput 
        : `https://${trimmedInput}`;
      
      const urlObj = new URL(urlToTest);
      
      if (!urlObj.hostname.includes('.') && urlObj.hostname !== 'localhost') {
        setError('Please enter a valid domain (e.g., example.com)');
        return false;
      }

      if (urlObj.hostname.replace(/\./g, '').length === 0) {
        setError('Please enter a valid domain name');
        return false;
      }

      const parts = urlObj.hostname.split('.');
      const hasValidParts = parts.every(part => part.length > 0);
      
      if (!hasValidParts) {
        setError('Please enter a valid domain (e.g., example.com)');
        return false;
      }

      return true;
    } catch {
      setError('Please enter a valid URL (e.g., example.com or https://example.com)');
      return false;
    }
  };

  const handleCheck = async () => {
    setError('');
    setResult(null);

    if (!validateUrl(url)) return;

    const formattedUrl = url.startsWith('http') ? url : `https://${url}`;

    setLoading(true);
    try {
      const data = await checkWebsite(formattedUrl);
      setResult(data);

      const newCheck: RecentCheck = {
        url: formattedUrl,
        timestamp: data.checkedAt,
        status: data.classification,
      };

      setRecentChecks((prev) => {
        const filtered = prev.filter((check) => check.url !== formattedUrl);
        return [newCheck, ...filtered].slice(0, 5);
      });
    } catch (err: any) {
      if (err.message && err.message.includes('Network')) {
        setError('Network error: Unable to reach the backend service. Check your connection.');
      } else if (err.code === 'ECONNABORTED') {
        setError('Request timeout: Backend took too long to respond.');
      } else {
        setError('Backend unreachable. Please try again later.');
      }
      console.error('Check failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectUrl = (selectedUrl: string) => {
    setUrl(selectedUrl);
    setError('');
    setResult(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCheck();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-6 animate-fade-in">
        <div className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-full mb-4">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-green-700 dark:text-green-400">Live Monitoring</span>
        </div>
        
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Website Uptime <span className="text-green-600 dark:text-green-500">Checker</span>
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Monitor your website's health in real-time. Check availability, validate SSL certificates, 
          and analyze performance metrics instantly.
        </p>

        <div className="flex items-center justify-center gap-8 pt-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-gray-600 dark:text-gray-400">Instant Results</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-gray-600 dark:text-gray-400">SSL Verified</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-gray-600 dark:text-gray-400">Global Checks</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6 border border-gray-200 dark:border-gray-700">
        <div>
          <label htmlFor="url-input" className="block text-sm font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
            Enter Website URL
          </label>
          <div className="relative group">
            <input
              id="url-input"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="example.com or https://example.com"
              className="w-full px-5 py-5 pl-14 pr-5 text-lg text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 hover:border-gray-400 dark:hover:border-gray-500"
              disabled={loading}
              autoFocus
            />
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-gray-500 transition-colors">
              <Search className="w-5 h-5" />
            </div>
          </div>
        </div>

        {error && (
          <div className="flex items-start space-x-3 p-5 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-xl">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-bold text-red-800 dark:text-red-300 mb-1">Error</p>
              <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
            </div>
          </div>
        )}

        <button
          onClick={handleCheck}
          disabled={loading}
          className="w-full py-5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white text-lg font-bold rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl disabled:shadow-none disabled:cursor-not-allowed transform hover:scale-[1.01] active:scale-[0.99] disabled:transform-none"
        >
          {loading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Analyzing Website...</span>
            </>
          ) : (
            <>
              <Search className="w-6 h-6" />
              <span>Check Website Status</span>
            </>
          )}
        </button>

        {!loading && !error && !result && (
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400 pt-2">
            <span>💡 Pro tip: Press</span>
            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs font-mono">Enter</kbd>
            <span>to check instantly</span>
          </div>
        )}
      </div>

      {result && <ResultCard result={result} />}

      {!result && !loading && recentChecks.length === 0 && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              What We Monitor
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive website health checks in one place
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-800 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-green-500 rounded-xl mb-4 shadow-lg">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Uptime Status
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                Instant verification of website availability with detailed HTTP status codes and response validation
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-500 rounded-xl mb-4 shadow-lg">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                SSL Validation
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                Automatic SSL certificate verification to ensure your website's security and trustworthiness
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl p-6 border-2 border-yellow-200 dark:border-yellow-800 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-yellow-500 rounded-xl mb-4 shadow-lg">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Performance Metrics
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                Real-time analysis of response time, TTFB, and overall health score for optimization insights
              </p>
            </div>
          </div>
        </div>
      )}

      <RecentChecks checks={recentChecks} onSelectUrl={handleSelectUrl} />
    </div>
  );
};
