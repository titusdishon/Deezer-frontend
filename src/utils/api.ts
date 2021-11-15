import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL || '',
  headers: {
    Accept: 'application/json',
  },
});

/**
 * @description Intercept the request and insert
 * auth header if required
 */
api.interceptors.request.use((config: AxiosRequestConfig) => {
  const NO_AUTH_HEADER_NEEDED: string[] = ['login'];

  if (NO_AUTH_HEADER_NEEDED.includes(config.url as string)) {
    return config;
  }
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${sessionStorage.getItem('token') || ''}`,
    },
  };
});

export default api;
