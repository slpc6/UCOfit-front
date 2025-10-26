/** Tipos para la gestión de comentarios */

export interface Comentario {
  comentario_id: string;
  usuario_id: string;
  comentario: string;
  fecha: string;
}

export interface ComentarioCrearRequest {
  comentario: string;
  publicacion_id: string;
}

export interface ComentarioResponse {
  comentario_id: string;
  usuario_id: string;
  comentario: string;
  fecha: string;
  nombre_usuario?: string;
}