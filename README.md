# UpPing 🚀

> A fast, modern website uptime and performance monitoring tool built with React, TypeScript, and Cloudflare Workers.

[![Deploy Status](https://img.shields.io/badge/deploy-cloudflare-orange)](https://upping.vxcloud.workers.dev/)
[![Frontend](https://img.shields.io/badge/frontend-react-blue)](https://reactjs.org/)
[![API](https://img.shields.io/badge/api-cloudflare%20workers-orange)](https://workers.cloudflare.com/)
[![TypeScript](https://img.shields.io/badge/typescript-ready-blue)](https://www.typescriptlang.com/)

## 🌟 Features

- **⚡ Real-time Website Monitoring** - Check any website's uptime and performance instantly
- **📊 Performance Metrics** - Get detailed insights including response time, TTFB, SSL status, and health scores
- **🎯 Smart Classification** - Automatic categorization of issues (DNS, SSL, timeouts, server errors, etc.)
- **📈 Health Scoring** - Comprehensive health scores based on multiple performance factors
- **🌐 Redirect Tracking** - Full redirect chain analysis with detailed hop-by-hop information
- **💾 Recent Checks** - Local storage of recent website checks for quick access
- **🌙 Dark Mode** - Beautiful dark/light theme toggle
- **📱 Responsive Design** - Works perfectly on desktop and mobile devices
- **⚡ Edge Computing** - Lightning-fast API powered by Cloudflare Workers
- **🔄 Caching** - Smart caching for improved performance

## 🏗️ Architecture

```
┌─────────────────┐    HTTP/HTTPS    ┌─────────────────┐
│                 │    ────────►     │                 │
│   Frontend      │                  │   Cloudflare    │
│   (React/Vite)  │    ◄────────     │   Workers API   │
│                 │      JSON        │                 │
└─────────────────┘                  └─────────────────┘
```

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **API**: Cloudflare Workers with edge caching
- **State Management**: React hooks + Local Storage
- **Styling**: Tailwind CSS with dark mode support
- **Icons**: Lucide React for beautiful iconography

## 📦 Project Structure

```
UpPing/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ResultCard.tsx
│   │   │   └── RecentChecks.tsx
│   │   ├── hooks/         # Custom React hooks
│   │   │   ├── useTheme.ts
│   │   │   └── useLocalStorage.ts
│   │   ├── lib/           # API client and utilities
│   │   │   └── api.ts
│   │   ├── pages/         # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Health.tsx
│   │   │   └── About.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── api/                   # Cloudflare Workers API
│   ├── src/
│   │   └── index.js       # Main worker script
│   ├── package.json
│   └── wrangler.jsonc     # Cloudflare Workers config
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Wrangler CLI** (for API deployment): `npm install -g wrangler`

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/vxrachit/UpPing.git
   cd UpPing
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env and set your API base URL
   VITE_API_BASE_URL=https://your-worker-domain.workers.dev/
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

### API Setup

1. **Install API dependencies**
   ```bash
   cd api
   npm install
   ```

2. **Start local development**
   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:8787`

3. **Deploy to Cloudflare Workers** (optional)
   ```bash
   # Login to Cloudflare (first time only)
   wrangler login
   
   # Deploy the worker
   npm run deploy
   ```

## 📚 API Documentation

### Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "ok": true,
  "version": "1.0.0",
  "timestamp": "2025-11-13T10:30:00.000Z"
}
```

### Website Check
```http
GET /api/check?url={website}
```

**Parameters:**
- `url` - The website to check (with or without protocol)

**Example:**
```http
GET /api/check?url=google.com
```

**Response:**
```json
{
  "requestedUrl": "https://google.com",
  "finalUrl": "https://www.google.com/",
  "redirected": true,
  "redirectCount": 1,
  "statusCode": 200,
  "responseTime": 245,
  "ttfb": 180,
  "sslStatus": "valid",
  "classification": "Success",
  "reason": "Website is healthy and responding normally",
  "advice": null,
  "healthScore": 95,
  "cached": false,
  "checkedAt": "2025-11-13T10:30:00.000Z"
}
```

### Status Classifications

- **Success** - Website is healthy and responding normally
- **client_error** - 4xx HTTP status codes
- **server_error** - 5xx HTTP status codes
- **timeout** - Request timeout or network timeout
- **invalid_domain** - DNS resolution failed or invalid domain
- **dns_error** - DNS lookup issues
- **ssl_error** - SSL/TLS certificate problems
- **network_error** - General network connectivity issues
- **unknown_error** - Unclassified errors

## 🎨 Features in Detail

### Performance Metrics
- **Response Time** - Total time to complete the request
- **TTFB (Time to First Byte)** - Server response latency
- **Health Score** - Composite score based on multiple factors
- **SSL Status** - SSL/TLS certificate validation
- **Content Type** - Response content type detection

### Smart Error Classification
The system automatically categorizes issues to help you quickly understand what's wrong:
- DNS resolution problems
- SSL certificate issues
- Server errors vs client errors
- Network timeouts
- Invalid domains

### Redirect Chain Analysis
Get detailed information about redirect chains:
- Complete redirect path
- Number of redirects
- Final destination URL
- Performance impact of redirects

### Recent Checks
- Automatic saving of recent website checks
- Quick access to previously checked URLs
- Local storage for privacy

## 🛠️ Development

### Available Scripts

**Frontend:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run typecheck    # TypeScript type checking
```

**API:**
```bash
npm run dev          # Start local development
npm run deploy       # Deploy to Cloudflare Workers
npm test            # Run tests
```

### Environment Variables

**Frontend (.env):**
```env
VITE_API_BASE_URL=https://your-api-domain.workers.dev/
```

### Tech Stack Details

**Frontend:**
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful icon library

**API:**
- **Cloudflare Workers** - Edge computing platform
- **Wrangler** - Cloudflare Workers CLI and development tool
- **Vitest** - Fast unit test framework

## 🚀 Deployment

### Frontend Deployment

Build the frontend for production:
```bash
cd frontend
npm run build
```

Deploy the `dist/` folder to your preferred hosting platform:
- **Vercel**: `npx vercel --prod`
- **Netlify**: Drag and drop the `dist/` folder
- **GitHub Pages**: Use GitHub Actions
- **Cloudflare Pages**: Connect your repository

### API Deployment

Deploy to Cloudflare Workers:
```bash
cd api
wrangler login      # First time only
npm run deploy
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Add TypeScript types for new features
- Test your changes thoroughly
- Update documentation as needed
- Keep commits focused and atomic


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



## 📞 Support

If you have any questions or need help:

- 📧 Email: [mail@vxrachit.is-a.dev](mailto:mail@vxrachit.is-a.dev)
- 🐛 Issues: [GitHub Issues](https://github.com/vxrachit/UpPing/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/vxrachit/UpPing/discussions)

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/vxrachit">vxrachit</a>
</p>

<p align="center">
  <a href="https://upping.vxrachit.is-a.dev/">🌐 Live Demo</a> •
  <a href="https://github.com/vxrachit/UpPing/issues">🐛 Report Bug</a> •
  <a href="https://github.com/vxrachit/UpPing/issues">✨ Request Feature</a>
</p>