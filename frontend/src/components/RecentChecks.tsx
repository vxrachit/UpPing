import { Clock, ExternalLink, History, TrendingUp, CheckCircle, XCircle } from 'lucide-react';

interface RecentCheck {
  url: string;
  timestamp: string;
  status: string;
}

interface RecentChecksProps {
  checks: RecentCheck[];
  onSelectUrl: (url: string) => void;
}

const getStatusBadgeColor = (status: string) => {
  const statusColors: Record<string, { bg: string; text: string; border: string; icon: string }> = {
    healthy: { 
      bg: 'bg-green-100 dark:bg-green-900/30', 
      text: 'text-green-700 dark:text-green-400',
      border: 'border-green-200 dark:border-green-700',
      icon: 'text-green-500'
    },
    timeout: { 
      bg: 'bg-yellow-100 dark:bg-yellow-900/30', 
      text: 'text-yellow-700 dark:text-yellow-400',
      border: 'border-yellow-200 dark:border-yellow-700',
      icon: 'text-yellow-500'
    },
    dns_error: { 
      bg: 'bg-yellow-100 dark:bg-yellow-900/30', 
      text: 'text-yellow-700 dark:text-yellow-400',
      border: 'border-yellow-200 dark:border-yellow-700',
      icon: 'text-yellow-500'
    },
    ssl_error: { 
      bg: 'bg-yellow-100 dark:bg-yellow-900/30', 
      text: 'text-yellow-700 dark:text-yellow-400',
      border: 'border-yellow-200 dark:border-yellow-700',
      icon: 'text-yellow-500'
    },
    server_error: { 
      bg: 'bg-red-100 dark:bg-red-900/30', 
      text: 'text-red-700 dark:text-red-400',
      border: 'border-red-200 dark:border-red-700',
      icon: 'text-red-500'
    },
    client_error: { 
      bg: 'bg-orange-100 dark:bg-orange-900/30', 
      text: 'text-orange-700 dark:text-orange-400',
      border: 'border-orange-200 dark:border-orange-700',
      icon: 'text-orange-500'
    },
    cloudflare_internal_error: { 
      bg: 'bg-red-100 dark:bg-red-900/30', 
      text: 'text-red-700 dark:text-red-400',
      border: 'border-red-200 dark:border-red-700',
      icon: 'text-red-500'
    },
    invalid_domain: { 
      bg: 'bg-orange-100 dark:bg-orange-900/30', 
      text: 'text-orange-700 dark:text-orange-400',
      border: 'border-orange-200 dark:border-orange-700',
      icon: 'text-orange-500'
    },
    unknown_error: { 
      bg: 'bg-gray-100 dark:bg-gray-700', 
      text: 'text-gray-700 dark:text-gray-300',
      border: 'border-gray-200 dark:border-gray-600',
      icon: 'text-gray-500'
    },
  };
  return statusColors[status] || statusColors.unknown_error;
};

const getTimeAgo = (timestamp: string) => {
  const now = new Date();
  const past = new Date(timestamp);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins === 1) return '1 minute ago';
  if (diffMins < 60) return `${diffMins} minutes ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours === 1) return '1 hour ago';
  if (diffHours < 24) return `${diffHours} hours ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return 'Yesterday';
  return `${diffDays} days ago`;
};

export const RecentChecks = ({ checks, onSelectUrl }: RecentChecksProps) => {
  if (checks.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <History className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Checks</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Latest monitoring results</p>
          </div>
        </div>
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
          {checks.length} {checks.length === 1 ? 'Check' : 'Checks'}
        </span>
      </div>

      {/* Checks List */}
      <div className="space-y-3">
        {checks.map((check, index) => {
          const colors = getStatusBadgeColor(check.status);
          const displayStatus = check.status ? check.status.replace('_', ' ').toUpperCase() : 'UNKNOWN';
          const timeAgo = getTimeAgo(check.timestamp);
          
          return (
            <button
              key={index}
              onClick={() => onSelectUrl(check.url)}
              className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors text-left border hover:bg-gray-50 dark:hover:bg-gray-800 ${colors.border} bg-white dark:bg-gray-900`}
            >
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <div className={`p-2 rounded-lg ${colors.bg}`}>
                  <ExternalLink className={`w-4 h-4 ${colors.icon}`} />
                </div>
                <div className="text-left min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {check.url.replace(/^https?:\/\//, '')}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{timeAgo}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded text-xs font-medium ${colors.bg} ${colors.text}`}>
                  {displayStatus}
                </span>
                <div className="text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};