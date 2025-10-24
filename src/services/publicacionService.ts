// Servicio para la gestion de publicaciones


//Internal imports
import api from './api';
import {Publicacion} from '../types/publicacion';
import {PublicacionResponse} from '../types/response';

export const publicacionService = {
  crearPublicacion: async (datos: Publicacion) => {
    const formData = new FormData();
    formData.append('titulo', datos.titulo);
    formData.append('descripcion', datos.descripcion);
    if (datos.video) {
      formData.append('video', datos.video);
    }
    if (datos.reto_id) {
      formData.append('reto_id', datos.reto_id);
    }
    
    const response = await api.post('/publicacion/crear', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  crear: async (datos: { titulo: string; descripcion: string; video: File; reto_id: string }) => {
    const formData = new FormData();
    formData.append('titulo', datos.titulo);
    formData.append('descripcion', datos.descripcion);
    formData.append('video', datos.video);
    formData.append('reto_id', datos.reto_id);
    
    const response = await api.post('/publicacion/crear', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  listarPublicaciones: async () => {
    const response = await api.get('/publicacion/general');
    return response.data.publicaciones;
  },

  listarPublicacionesUsuario: async () => {
    const response = await api.get('/publicacion/usuario');
    return response.data.publicaciones;
  },

  listarPublicacionesReto: async (retoId: string) => {
    const response = await api.get(`/publicacion/reto/${retoId}`);
    return response;
  },

  encontrarVideo: async (video_id: string) => {
    const response = await api.get(`/publicacion/video/${video_id}`);
    return response.data;
  },

  encontrarPublicacion: async (publicacion_id: string)=>{
    const response = await api.get(`/publicacion/${publicacion_id}`);
    response.data.video_url = api.defaults.baseURL + '/publicacion/video/' + response.data.video;
    return response.data;
  },

  editarPublicacion: async (publicacionId: string, datos: { titulo?: string; descripcion?: string }): Promise<PublicacionResponse> => {
    const params = new URLSearchParams();
    if (datos.titulo) params.append('titulo', datos.titulo);
    if (datos.descripcion) params.append('descripcion', datos.descripcion);
    
    const response = await api.put(`/publicacion/editar/${publicacionId}?${params.toString()}`);
    return response.data;
  },

  eliminarPublicacion: async (publicacionId: string): Promise<PublicacionResponse> => {
    const response = await api.delete(`/publicacion/eliminar/${publicacionId}`);
    return response.data;
  }
};
