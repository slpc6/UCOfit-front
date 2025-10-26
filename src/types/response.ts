
/** Tipos para las respuestas de la API */

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface RespuestaAPI<T = unknown> {
  message: string;
  data?: T;
}

export interface PublicacionResponse {
  msg: string;
}