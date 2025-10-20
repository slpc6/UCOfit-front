import { Comentario } from "./comentario";

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
    comentarios?: Comentario[] | Record<string, any>;
    puntuacion?: number;
    puntuaciones?: PuntuacionUsuario[];
    puntuacion_promedio?: number;
}