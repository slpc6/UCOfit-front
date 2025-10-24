export interface PuntuacionUsuario {
    usuario_id: string;
    puntuacion: number;
    fecha: string;
}

import { Comentario } from './comentario';

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