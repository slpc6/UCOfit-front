/** Tipos para la gestión de publicaciones */

import { Comentario } from './comentario';

export interface PuntuacionUsuario {
  usuario_id: string;
  puntuacion: number;
  fecha: string;
}

export interface Publicacion {
  _id?: string;
  titulo: string;
  descripcion: string;
  video: File | null | string;
  video_url?: string;
  usuario_id?: string;
  reto_id?: string;
  comentarios: Comentario[];
  puntuaciones: PuntuacionUsuario[];
  puntuacion_promedio: number;
}

export interface PublicacionCrearRequest {
  titulo: string;
  descripcion: string;
  reto_id?: string;
}

export interface PublicacionCrearResponse {
  msg: string;
  publicacion_id: string;
  video_id: string;
  reto_id: string;
}

export interface PublicacionEditarRequest {
  titulo?: string;
  descripcion?: string;
}