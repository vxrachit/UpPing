import { Clock, ExternalLink } from 'lucide-react';

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
  const statusColors: Record<string, { bg: string; text: string }> = {
    healthy: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400' },
    timeout: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400' },
    dns_error: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400' },
    ssl_error: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400' },
    server_error: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400' },
    client_error: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-400' },
    cloudflare_internal_error: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400' },
    invalid_domain: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-400' },
    unknown_error: { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-700 dark:text-gray-300' },
  };
  return statusColors[status] || statusColors.unknown_error;
};

export const RecentChecks = ({ checks, onSelectUrl }: RecentChecksProps) => {
  if (checks.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-2 mb-5">
        <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Checks</h3>
        <span className="ml-auto text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
          {checks.length}
        </span>
      </div>

      <div className="space-y-2">
        {checks.map((check, index) => {
          const colors = getStatusBadgeColor(check.status);
          const displayStatus = check.status ? check.status.replace('_', ' ').toUpperCase() : 'UNKNOWN';
          return (
            <button
              key={index}
              onClick={() => onSelectUrl(check.url)}
              className="w-full flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 group border border-transparent hover:border-gray-300 dark:hover:border-gray-600"
            >
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors flex-shrink-0" />
                <div className="text-left min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    {check.url}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {new Date(check.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <span className={`text-xs font-bold px-3 py-1.5 rounded-lg flex-shrink-0 ${colors.bg} ${colors.text}`}>
                {displayStatus}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
