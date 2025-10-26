/** Servicio centralizado para la gestión de la API */

import axios, { AxiosError, AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: 'https://ucofit-back.onrender.com',
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Error handled by interceptor
    return Promise.reject(error);
  }
);

export default api;