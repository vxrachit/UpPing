import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export interface CheckResponse {
  requestedUrl: string;
  finalUrl: string;
  redirected: boolean;
  redirectCount: number;
  statusCode: number;
  responseTime: number;
  ttfb: number;
  sslStatus: string;
  classification: string;
  reason: string;
  advice: string | null;
  healthScore: number;
  cached: boolean;
  checkedAt: string;
}

export interface HealthResponse {
  ok: boolean;
  version: string;
  timestamp: string;
}

export const checkWebsite = async (url: string): Promise<CheckResponse> => {
  const response = await api.get('/api/check', { params: { url } });
  return response.data;
};

export const checkHealth = async (): Promise<HealthResponse> => {
  const response = await api.get('/api/health');
  return response.data;
};

export default api;
