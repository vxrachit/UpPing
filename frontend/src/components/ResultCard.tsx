import { CheckCircle2, XCircle, Shield, Zap, Clock, TrendingUp, AlertTriangle, AlertCircle } from 'lucide-react';
import { CheckResponse } from '../lib/api';

interface ResultCardProps {
  result: CheckResponse;
}

export const ResultCard = ({ result }: ResultCardProps) => {
  const getStatusInfo = (classification: string) => {
    const statuses: Record<string, { isHealthy: boolean; label: string; icon: React.ElementType; bgColor: string; textColor: string; advisoryBg: string; advisoryBorder: string; advisoryText: string }> = {
      healthy: {
        isHealthy: true,
        label: 'UP',
        icon: CheckCircle2,
        bgColor: 'bg-green-50 dark:bg-green-900/20',
        textColor: 'text-green-500',
        advisoryBg: 'bg-green-50 dark:bg-green-900/20',
        advisoryBorder: 'border-green-200 dark:border-green-800',
        advisoryText: 'text-green-800 dark:text-green-300',
      },
      timeout: {
        isHealthy: false,
        label: 'TIMEOUT',
        icon: AlertTriangle,
        bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
        textColor: 'text-yellow-600',
        advisoryBg: 'bg-yellow-50 dark:bg-yellow-900/20',
        advisoryBorder: 'border-yellow-200 dark:border-yellow-800',
        advisoryText: 'text-yellow-800 dark:text-yellow-300',
      },
      dns_error: {
        isHealthy: false,
        label: 'DNS ERROR',
        icon: AlertTriangle,
        bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
        textColor: 'text-yellow-600',
        advisoryBg: 'bg-yellow-50 dark:bg-yellow-900/20',
        advisoryBorder: 'border-yellow-200 dark:border-yellow-800',
        advisoryText: 'text-yellow-800 dark:text-yellow-300',
      },
      ssl_error: {
        isHealthy: false,
        label: 'SSL ERROR',
        icon: AlertTriangle,
        bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
        textColor: 'text-yellow-600',
        advisoryBg: 'bg-yellow-50 dark:bg-yellow-900/20',
        advisoryBorder: 'border-yellow-200 dark:border-yellow-800',
        advisoryText: 'text-yellow-800 dark:text-yellow-300',
      },
      server_error: {
        isHealthy: false,
        label: 'SERVER ERROR',
        icon: XCircle,
        bgColor: 'bg-red-50 dark:bg-red-900/20',
        textColor: 'text-red-500',
        advisoryBg: 'bg-red-50 dark:bg-red-900/20',
        advisoryBorder: 'border-red-200 dark:border-red-800',
        advisoryText: 'text-red-800 dark:text-red-300',
      },
      client_error: {
        isHealthy: false,
        label: 'CLIENT ERROR',
        icon: XCircle,
        bgColor: 'bg-orange-50 dark:bg-orange-900/20',
        textColor: 'text-orange-500',
        advisoryBg: 'bg-orange-50 dark:bg-orange-900/20',
        advisoryBorder: 'border-orange-200 dark:border-orange-800',
        advisoryText: 'text-orange-800 dark:text-orange-300',
      },
      cloudflare_internal_error: {
        isHealthy: false,
        label: 'CLOUDFLARE ERROR',
        icon: AlertCircle,
        bgColor: 'bg-red-50 dark:bg-red-900/20',
        textColor: 'text-red-500',
        advisoryBg: 'bg-red-50 dark:bg-red-900/20',
        advisoryBorder: 'border-red-200 dark:border-red-800',
        advisoryText: 'text-red-800 dark:text-red-300',
      },
      invalid_domain: {
        isHealthy: false,
        label: 'INVALID DOMAIN',
        icon: AlertTriangle,
        bgColor: 'bg-orange-50 dark:bg-orange-900/20',
        textColor: 'text-orange-500',
        advisoryBg: 'bg-orange-50 dark:bg-orange-900/20',
        advisoryBorder: 'border-orange-200 dark:border-orange-800',
        advisoryText: 'text-orange-800 dark:text-orange-300',
      },
      unknown_error: {
        isHealthy: false,
        label: 'SUCCESS',
        icon: AlertCircle,
        bgColor: 'bg-gray-50 dark:bg-gray-900/20',
        textColor: 'text-gray-600 dark:text-gray-400',
        advisoryBg: 'bg-gray-50 dark:bg-gray-900/20',
        advisoryBorder: 'border-gray-200 dark:border-gray-800',
        advisoryText: 'text-gray-800 dark:text-gray-300',
      },
    };

    return statuses[classification] || statuses.unknown_error;
  };

  const statusInfo = getStatusInfo(result.classification);
  const StatusIcon = statusInfo.icon;

  const getHealthScoreColor = (score: number) => {
    if (score > 80) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6 animate-fade-in border border-gray-200 dark:border-gray-700">
      <div className={`flex items-center justify-between p-6 rounded-lg ${statusInfo.bgColor} border ${statusInfo.advisoryBorder}`}>
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/50 dark:bg-gray-900/50 rounded-lg">
            <StatusIcon className={`w-10 h-10 ${statusInfo.textColor}`} />
          </div>
          <div>
            <h3 className={`text-3xl font-bold ${statusInfo.textColor}`}>
              {statusInfo.label}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              HTTP {result.statusCode} • {result.reason}
            </p>
          </div>
        </div>
        {result.cached && (
          <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-lg border border-blue-200 dark:border-blue-800">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">Cached</span>
          </div>
        )}
      </div>

      <div className="space-y-5">
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Health Score
            </span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {result.healthScore}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full ${getHealthScoreColor(result.healthScore)} transition-all duration-500`}
              style={{ width: `${result.healthScore}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Response Time</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {result.responseTime}<span className="text-sm text-gray-500 dark:text-gray-400">ms</span>
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">TTFB</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {result.ttfb}<span className="text-sm text-gray-500 dark:text-gray-400">ms</span>
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              SSL Certificate
            </span>
          </div>
          <span
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${
              result.sslStatus === 'valid'
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
            }`}
          >
            {result.sslStatus ? result.sslStatus.toUpperCase() : 'UNKNOWN'}
          </span>
        </div>

        {result.redirected && (
          <div className="p-5 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                  Redirected {result.redirectCount} time(s)
                </p>
                <p className="text-xs text-yellow-700 dark:text-yellow-400 break-all">
                  {result.requestedUrl} → {result.finalUrl}
                </p>
              </div>
            </div>
          </div>
        )}

        {result.advice && (
          <div className={`p-5 rounded-lg border ${statusInfo.advisoryBg} ${statusInfo.advisoryBorder}`}>
            <p className={`text-sm font-semibold ${statusInfo.advisoryText} mb-2 flex items-center space-x-2`}>
              <AlertTriangle className="w-4 h-4" />
              <span>Recommendation</span>
            </p>
            <p className={`text-sm ${statusInfo.advisoryText}`}>{result.advice}</p>
          </div>
        )}

        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Checked at {new Date(result.checkedAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};
