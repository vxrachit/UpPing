import { Activity, Zap, Shield, Globe } from 'lucide-react';

export const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-4 animate-fade-in">
        <div className="flex items-center justify-center space-x-3">
          <Activity className="w-12 h-12 text-green-500" />
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
            About UpPing
          </h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Your reliable companion for website monitoring and performance analysis
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            What is UpPing?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            UpPing is a modern, free website monitoring tool designed to help you ensure your websites
            are always up and running smoothly. Whether you're a developer, business owner, or IT
            professional, UpPing provides instant insights into your website's health and performance.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Built on cutting-edge serverless technology, UpPing delivers lightning-fast checks from
            edge locations worldwide, ensuring you get accurate and reliable monitoring data in seconds.
          </p>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Why Choose UpPing?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <Activity className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Real-Time Monitoring
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get instant website availability checks with detailed HTTP status codes and response data
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <Shield className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">SSL Security Check</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Automatic SSL certificate validation to ensure your site's security is up to date
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <Zap className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Performance Analytics
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Measure response times, TTFB, and get comprehensive health scores for optimization
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <Globe className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Smart Redirect Tracking
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Detect and analyze HTTP redirects to understand your site's routing behavior
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h3>
          <ol className="space-y-4 text-gray-600 dark:text-gray-400">
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-bold">
                1
              </span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Enter Website URL</p>
                <p className="text-sm">Simply enter any website URL you want to check - no signup required</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-bold">
                2
              </span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Instant Analysis</p>
                <p className="text-sm">Our system performs comprehensive checks from edge locations worldwide in seconds</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-bold">
                3
              </span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Get Detailed Results</p>
                <p className="text-sm">Review comprehensive metrics, health scores, and actionable insights to optimize your site</p>
              </div>
            </li>
          </ol>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Perfect For
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-5 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="text-3xl mb-2">👨‍💻</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Developers</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Quick checks during deployment and testing
              </p>
            </div>
            <div className="text-center p-5 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="text-3xl mb-2">💼</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Businesses</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Monitor your online presence 24/7
              </p>
            </div>
            <div className="text-center p-5 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="text-3xl mb-2">🔧</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">IT Teams</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Diagnose issues and track performance
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800 rounded-xl p-8 text-center shadow-lg">
        <div className="max-w-2xl mx-auto space-y-3">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            100% Free Forever
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            No hidden fees, no subscriptions, no credit card required. UpPing is completely free
            to use for everyone. Monitor as many websites as you need, whenever you need.
          </p>
          <div className="pt-2">
            <span className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold">
              Start checking your websites now →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
