import { Comentario } from "./comentario";


export interface Publicacion {
    _id?: string;
    titulo: string;
    descripcion: string;
    video: string;
    usuario_id?: string;
    comentarios?: Comentario[];
    puntuacion: number;
  }