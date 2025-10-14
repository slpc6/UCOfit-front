// Servicio para la gestion de publicaciones


//Internal imports
import api from './api';
import {Publicacion} from '../types/publicacion'

export const publicacionService = {
  crearPublicacion: async (datos: Publicacion) => {
    const formData = new FormData();
    formData.append('titulo', datos.titulo);
    formData.append('descripcion', datos.descripcion);
    if (datos.video) {
      formData.append('video', datos.video);
    }
    
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

  editarPublicacion: async (publicacionId: string, datos: { titulo?: string; descripcion?: string; video?: string }) => {
    const params = new URLSearchParams({ publicacion_id: publicacionId });
    if (datos.titulo) params.append('titulo', datos.titulo);
    if (datos.descripcion) params.append('descripcion', datos.descripcion);
    if (datos.video) params.append('video', datos.video);
    
    const response = await api.put(`/publicacion/editar?${params.toString()}`);
    return response.data;
  },

  eliminarPublicacion: async (publicacionId: string) => {
    const response = await api.delete(`/publicacion/eliminar/${publicacionId}`);
    return response.data;
  }
};
