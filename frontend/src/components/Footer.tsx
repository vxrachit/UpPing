import { Heart, Activity, Github, Mail, FileText, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export const Footer = ({ onNavigate }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (page: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 border-t border-gray-200/60 dark:border-gray-700/60 mt-16">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="space-y-5 md:col-span-2">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg shadow-blue-500/30">
                <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <span className="text-xl font-black text-gray-900 dark:text-white">
                  UpPing
                </span>
                <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">Professional Monitoring</div>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-md">
              Enterprise-grade website monitoring with real-time uptime tracking, SSL validation, and comprehensive performance analytics.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-3 pt-2">
              <a 
                href="https://github.com/vxrachit/UpPing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 group"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
              </a>
              <a 
                href="mailto:mail@vxrachit.is-a.dev"
                className="p-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 group"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
              </a>
              <a 
                href="https://docs.vxrachit.is-a.dev/upping" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 group"
                aria-label="Documentation"
              >
                <FileText className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-sm font-black text-gray-900 dark:text-white mb-5 uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#"
                  onClick={handleNavClick('home')}
                  className="group flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#"
                  onClick={handleNavClick('about')}
                  className="group flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="#"
                  onClick={handleNavClick('health')}
                  className="group flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
                  System Status
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-black text-gray-900 dark:text-white mb-5 uppercase tracking-wider">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://docs.vxrachit.is-a.dev/upping" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span className="w-1.5 h-1.5 bg-purple-600 dark:bg-purple-400 rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
                  Documentation
                  <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/vxrachit/UpPing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span className="w-1.5 h-1.5 bg-purple-600 dark:bg-purple-400 rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
                  GitHub
                  <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a 
                  href="mailto:mail@vxrachit.is-a.dev"
                  className="group flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span className="w-1.5 h-1.5 bg-purple-600 dark:bg-purple-400 rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200/60 dark:border-gray-700/60">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              © {currentYear} <span className="font-bold text-gray-900 dark:text-white">UpPing</span>. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Crafted with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              <span>by</span>
              <a 
                href="https://vxrachit.is-a.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                vxRachit
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
