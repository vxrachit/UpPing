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
    <div className="relative animate-fade-in">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
      <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-professional-lg p-8 space-y-8 border border-gray-200/60 dark:border-gray-700/60">
        
        {/* Status Header */}
        <div className={`relative overflow-hidden flex items-center justify-between p-8 rounded-2xl ${statusInfo.bgColor} border-2 ${statusInfo.advisoryBorder}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-50"></div>
          <div className="relative flex items-center space-x-6">
            <div className="p-4 bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-lg backdrop-blur-sm">
              <StatusIcon className={`w-12 h-12 ${statusInfo.textColor}`} strokeWidth={2} />
            </div>
            <div>
              <h2 className={`text-4xl font-black ${statusInfo.textColor} tracking-tight`}>
                {statusInfo.label}
              </h2>
              <p className={`text-base font-semibold ${statusInfo.advisoryText} mt-2`}>
                HTTP {result.statusCode} • {result.reason}
              </p>
            </div>
          </div>
          {result.cached && (
            <div className="relative flex items-center space-x-3 text-blue-600 dark:text-blue-400 bg-blue-100/80 dark:bg-blue-900/40 backdrop-blur-sm px-6 py-3 rounded-xl border border-blue-200 dark:border-blue-700 font-semibold">
              <Zap className="w-5 h-5" />
              <span>Cached Result</span>
            </div>
          )}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Health Score */}
          <div className="lg:col-span-3 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-8 border border-gray-200/60 dark:border-gray-700/60 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Overall Health Score</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Comprehensive website health assessment</p>
              </div>
              <div className={`text-4xl font-black ${getHealthScoreColor(result.healthScore).replace('bg-', 'text-')}`}>
                {result.healthScore}%
              </div>
            </div>
            <div className="relative w-full bg-gray-300 dark:bg-gray-700 rounded-full h-4 overflow-hidden shadow-inner">
              <div
                className={`h-full ${getHealthScoreColor(result.healthScore)} transition-all duration-1000 ease-out rounded-full relative`}
                style={{ width: `${result.healthScore}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Response Time */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200/60 dark:border-blue-700/60 backdrop-blur-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider">Response Time</h4>
                <p className="text-xs text-blue-600 dark:text-blue-400">Server response latency</p>
              </div>
            </div>
            <p className="text-3xl font-black text-gray-900 dark:text-white">
              {result.responseTime}<span className="text-lg font-normal text-gray-500 dark:text-gray-400 ml-1">ms</span>
            </p>
          </div>

          {/* TTFB */}
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-2xl p-6 border border-purple-200/60 dark:border-purple-700/60 backdrop-blur-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider">TTFB</h4>
                <p className="text-xs text-purple-600 dark:text-purple-400">Time to first byte</p>
              </div>
            </div>
            <p className="text-3xl font-black text-gray-900 dark:text-white">
              {result.ttfb}<span className="text-lg font-normal text-gray-500 dark:text-gray-400 ml-1">ms</span>
            </p>
          </div>

          {/* SSL Status */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200/60 dark:border-green-700/60 backdrop-blur-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-green-700 dark:text-green-300 uppercase tracking-wider">SSL Certificate</h4>
                <p className="text-xs text-green-600 dark:text-green-400">Security validation</p>
              </div>
            </div>
            <span
              className={`inline-block px-4 py-2 rounded-xl text-sm font-bold ${
                result.sslStatus === 'valid'
                  ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300'
                  : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300'
              }`}
            >
              {result.sslStatus ? result.sslStatus.toUpperCase() : 'UNKNOWN'}
            </span>
          </div>
        </div>

        {/* Additional Information */}
        <div className="space-y-6">
          {result.redirected && (
            <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-amber-200/60 dark:border-amber-700/60">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl"></div>
              <div className="relative flex items-start space-x-4">
                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-amber-900 dark:text-amber-300 mb-3">
                    Redirect Detection
                  </h4>
                  <p className="text-sm text-amber-800 dark:text-amber-400 mb-4">
                    Website redirected {result.redirectCount} time{result.redirectCount !== 1 ? 's' : ''}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-medium text-amber-700 dark:text-amber-400">FROM:</span>
                      <code className="text-xs bg-white dark:bg-black/20 px-2 py-1 rounded border text-amber-800 dark:text-amber-300 break-all">
                        {result.requestedUrl}
                      </code>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-medium text-amber-700 dark:text-amber-400">TO:</span>
                      <code className="text-xs bg-white dark:bg-black/20 px-2 py-1 rounded border text-amber-800 dark:text-amber-300 break-all">
                        {result.finalUrl}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {result.advice && (
            <div className={`relative overflow-hidden rounded-2xl p-6 border-2 ${statusInfo.advisoryBg} ${statusInfo.advisoryBorder}`}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 dark:bg-black/20 rounded-full blur-2xl"></div>
              <div className="relative flex items-start space-x-4">
                <div className={`p-3 bg-white/80 dark:bg-gray-900/80 rounded-xl flex-shrink-0`}>
                  <AlertCircle className={`w-6 h-6 ${statusInfo.textColor}`} />
                </div>
                <div className="flex-1">
                  <h4 className={`text-lg font-bold ${statusInfo.advisoryText} mb-3`}>
                    Professional Recommendation
                  </h4>
                  <p className={`text-sm leading-relaxed ${statusInfo.advisoryText}`}>
                    {result.advice}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-gray-200/60 dark:border-gray-700/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>Analysis completed at {new Date(result.checkedAt).toLocaleString()}</span>
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500">
              Powered by UpPing
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
