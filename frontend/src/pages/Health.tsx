import { useState, useEffect } from 'react';
import { Activity, CheckCircle2, XCircle, Loader2, RefreshCw } from 'lucide-react';
import { checkHealth, HealthResponse } from '../lib/api';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const Health = () => {
  const [loading, setLoading] = useState(true);
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState(false);

  const heroAnim = useScrollAnimation();
  const contentAnim = useScrollAnimation();

  const fetchHealth = async () => {
    setLoading(true);
    setError(false);
    setHealth(null);
    try {
      const data = await checkHealth();
      if (data && data.ok === true) {
        setHealth(data);
        setError(false);
      } else {
        setError(true);
        setHealth(null);
      }
    } catch (err) {
      setError(true);
      setHealth(null);
      console.error('Health check failed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div 
        ref={heroAnim.ref}
        className={`text-center space-y-4 transition-all duration-700 ease-out ${heroAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="flex items-center justify-center space-x-3">
          <Activity className="w-12 h-12 text-green-500" />
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
            Backend Health
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Monitor the status of the UpPing backend service
        </p>
      </div>

      {loading ? (
        <div 
          ref={contentAnim.ref}
          className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 flex flex-col items-center justify-center space-y-4 border border-gray-200 dark:border-gray-700 transition-all duration-700 ease-out ${contentAnim.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        >
          <Loader2 className="w-12 h-12 text-green-500 animate-spin" />
          <p className="text-gray-600 dark:text-gray-400 font-medium">Checking backend status...</p>
        </div>
      ) : error ? (
        <div 
          ref={contentAnim.ref}
          className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 space-y-6 border-l-4 border-red-500 transition-all duration-700 ease-out ${contentAnim.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full">
              <XCircle className="w-16 h-16 text-red-500" />
            </div>
            <h2 className="text-3xl font-bold text-red-600 dark:text-red-400">
              Backend Offline
            </h2>
            
            <button
              onClick={fetchHealth}
              className="mt-4 px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Retry Connection</span>
            </button>
          </div>
        </div>
      ) : (
        health && (
          <div 
            ref={contentAnim.ref}
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6 border-l-4 border-green-500 transition-all duration-700 ease-out ${contentAnim.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full">
                <CheckCircle2 className="w-16 h-16 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-green-600 dark:text-green-400">Backend Connected</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Service is operating normally</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 rounded-lg p-6 border border-green-200 dark:border-green-800">
                <p className="text-xs text-green-700 dark:text-green-400 font-semibold mb-2 uppercase">Status</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {health.ok ? 'Online' : 'Offline'}
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <p className="text-xs text-blue-700 dark:text-blue-400 font-semibold mb-2 uppercase">Version</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  v{health.version}
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                <p className="text-xs text-purple-700 dark:text-purple-400 font-semibold mb-2 uppercase">Uptime</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  Live
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 md:col-span-3 border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium">Last Checked</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {new Date(health.timestamp).toLocaleString()}
                </p>
              </div>
            </div>

            <button
              onClick={fetchHealth}
              className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Refresh Status</span>
            </button>
          </div>
        )
      )}
    </div>
  );
};
