import { Github, Heart, Activity } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  UpPing
                </span>
                <div className="text-sm text-gray-500 dark:text-gray-400">Website Monitor</div>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Professional website monitoring with reliable uptime tracking and performance analytics.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Features</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Uptime Monitoring</a></li>
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">SSL Monitoring</a></li>
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Performance Analytics</a></li>
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Real-time Alerts</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact Us</a></li>
              <li><a href="https://github.com/vxrachit/UpPing" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">GitHub</a></li>
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Community</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {currentYear} UpPing. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Made with <Heart className="w-4 h-4 text-red-500 inline" /> for developers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
