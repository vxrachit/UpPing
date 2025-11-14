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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCheck();
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
    <div className="relative max-w-6xl mx-auto px-6 py-12 space-y-16">
      {/* Clean Hero Section */}
      <div className="text-center space-y-8">
        {/* Status Indicator */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-50/80 dark:bg-emerald-900/20 border border-emerald-200/50 dark:border-emerald-700/30 rounded-full shadow-sm">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Live Monitoring Active</span>
        </div>
        
        {/* Main Headline */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
            Professional Website
            <span className="block text-blue-600 dark:text-blue-400">
              Monitoring
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Monitor your websites with enterprise-grade reliability. Get instant alerts,
            performance insights, and comprehensive uptime tracking.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="flex flex-wrap justify-center gap-6 pt-4">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">Real-time Alerts</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Shield className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">SSL Monitoring</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">Performance Analytics</span>
          </div>
        </div>
      </div>

      {/* Monitoring Form */}
      <div className="relative">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Start Monitoring</h2>
              <p className="text-gray-600 dark:text-gray-400">Enter your website URL to begin comprehensive monitoring</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Website URL
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://your-website.com"
                    className="w-full pl-12 pr-4 py-3 text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    disabled={loading}
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Globe className="w-5 h-5" />
                  </div>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Search className="w-5 h-5" />
                    <span>Start Monitoring</span>
                  </div>
                )}
              </button>
            </form>

            {error && (
              <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                </div>
              </div>
            )}
            
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Real-time Monitoring</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Continuous uptime checks</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Security Monitoring</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">SSL & security checks</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Performance Insights</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Detailed analytics</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {result && <ResultCard result={result} />}

      {recentChecks.length > 0 && (
        <div className="mt-12">
          <RecentChecks checks={recentChecks} onSelectUrl={setUrl} />
        </div>
      )}
    </div>
  );
};
