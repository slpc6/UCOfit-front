/** Tipos para la gestión de retos */

export interface Reto {
  id: string;
  titulo: string;
  descripcion: string;
  creador_id: string;
  fecha_expiracion: string;
  dias_restantes: number;
  is_expired: boolean;
}

export interface RetoCrear {
  titulo: string;
  descripcion: string;
}

export interface RetoActualizar {
  titulo?: string;
  descripcion?: string;
}

export interface RetoConPublicacionRequest {
  titulo_reto: string;
  descripcion_reto: string;
  titulo_publicacion: string;
  descripcion_publicacion: string;
}

export interface RetoConPublicacionResponse {
  msg: string;
  reto_id: string;
  publicacion_id: string;
  video_id: string;
}

export interface UsuarioRanking {
  usuario_id: string;
  nombre: string;
  apellido: string;
  email: string;
  foto_perfil?: string;
  ciudad?: string;
  puntuacion_total: number;
  promedio_puntuacion: number;
  posicion: number;
  total_publicaciones: number;
}
