/** Servicio base para manejo consistente de errores y respuestas */

import { AxiosError, AxiosResponse } from 'axios';
import { RespuestaAPI } from '../types/response';


interface ApiErrorData {
  error?: string;
  msg?: string;
  message?: string;
}

// Tipo para errores de Axios con datos tipados
export interface TypedAxiosError {
  response?: {
    data?: ApiErrorData;
    status?: number;
    statusText?: string;
  };
  request?: unknown;
  message?: string;
}

export class ApiError extends Error {
  public status?: number;
  public data?: unknown;

  constructor(message: string, status?: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export const handleApiError = (error: unknown): RespuestaAPI => {
  const axiosError = error as AxiosError;
  let message = 'Error desconocido';
  
  if (axiosError.response) {
    const errorData = axiosError.response.data as ApiErrorData;
    message = errorData?.error || errorData?.msg || `Error ${axiosError.response.status}: ${axiosError.response.statusText}`;
  } else if (axiosError.request) {
    message = 'No se pudo conectar con el servidor. Verifica que la API esté ejecutándose.';
  } else {
    message = axiosError.message || 'Error desconocido';
  }
  
  return {
    message,
    data: null,
  };
};

export const handleApiSuccess = (response: AxiosResponse, defaultMessage: string): RespuestaAPI => {
  const responseData = response.data;
  return {
    message: responseData?.msg || responseData?.message || defaultMessage,
    data: responseData,
  };
};
