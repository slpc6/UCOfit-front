/** Servicio para la gestión de publicaciones */

import api from './api';
import { handleApiError, handleApiSuccess } from './baseService';
import { 
  Publicacion,
  PublicacionCrearRequest, 
  PublicacionCrearResponse,
  PublicacionEditarRequest 
} from '../types/publicacion';
import { RespuestaAPI } from '../types/response';

export const publicacionService = {

  crear: async (
    data: PublicacionCrearRequest, 
    video?: File | null
  ): Promise<RespuestaAPI<PublicacionCrearResponse>> => {
    try {
      const formData = new FormData();
      formData.append('titulo', data.titulo);
      formData.append('descripcion', data.descripcion);
      if (data.reto_id) {
        formData.append('reto_id', data.reto_id);
      }
      if (video) {
        formData.append('video', video);
      }
      
      const response = await api.post('/publicacion/crear', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return handleApiSuccess(response, 'Publicación creada exitosamente') as RespuestaAPI<PublicacionCrearResponse>;
    } catch (error) {
      return handleApiError(error) as RespuestaAPI<PublicacionCrearResponse>;
    }
  },


  listar: async (): Promise<RespuestaAPI<{publicaciones: Publicacion[]}>> => {
    try {
      const response = await api.get('/publicacion/general');
      return handleApiSuccess(response, 'Publicaciones obtenidas exitosamente') as RespuestaAPI<{publicaciones: Publicacion[]}>;
    } catch (error) {
      return handleApiError(error) as RespuestaAPI<{publicaciones: Publicacion[]}>;
    }
  },


  listarUsuario: async (): Promise<RespuestaAPI<{publicaciones: Publicacion[]}>> => {
    try {
      const response = await api.get('/publicacion/usuario');
      return handleApiSuccess(response, 'Publicaciones del usuario obtenidas exitosamente') as RespuestaAPI<{publicaciones: Publicacion[]}>;
    } catch (error) {
      return handleApiError(error) as RespuestaAPI<{publicaciones: Publicacion[]}>;
    }
  },


  listarPorReto: async (retoId: string): Promise<RespuestaAPI<{publicaciones: Publicacion[]}>> => {
    try {
      const response = await api.get(`/publicacion/reto/${retoId}`);
      return handleApiSuccess(response, 'Publicaciones del reto obtenidas exitosamente') as RespuestaAPI<{publicaciones: Publicacion[]}>;
    } catch (error) {
      return handleApiError(error) as RespuestaAPI<{publicaciones: Publicacion[]}>;
    }
  },


  obtener: async (publicacionId: string): Promise<RespuestaAPI<Publicacion>> => {
    try {
      const response = await api.get(`/publicacion/${publicacionId}`);
      const data = response.data;
      
      // Agregar URL del video si existe
      if (data.video) {
        data.video_url = `${api.defaults.baseURL}/publicacion/video/${data.video}`;
      }
      
      return handleApiSuccess({ ...response, data }, 'Publicación obtenida exitosamente') as RespuestaAPI<Publicacion>;
    } catch (error) {
      return handleApiError(error) as RespuestaAPI<Publicacion>;
    }
  },


  editar: async (
    publicacionId: string, 
    data: PublicacionEditarRequest
  ): Promise<RespuestaAPI<Publicacion>> => {
    try {
      const response = await api.put(`/publicacion/editar/${publicacionId}`, data);
      return handleApiSuccess(response, 'Publicación actualizada exitosamente') as RespuestaAPI<Publicacion>;
    } catch (error) {
      return handleApiError(error) as RespuestaAPI<Publicacion>;
    }
  },


  eliminar: async (publicacionId: string): Promise<RespuestaAPI<{msg: string}>> => {
    try {
      const response = await api.delete(`/publicacion/eliminar/${publicacionId}`);
      return handleApiSuccess(response, 'Publicación eliminada exitosamente') as RespuestaAPI<{msg: string}>;
    } catch (error) {
      return handleApiError(error) as RespuestaAPI<{msg: string}>;
    }
  },


  obtenerVideoUrl: (videoId: string): string => {
    return `${api.defaults.baseURL}/publicacion/video/${videoId}`;
  },

  // Métodos adicionales para compatibilidad
  crearPublicacion: async (data: PublicacionCrearRequest, video?: File | null): Promise<RespuestaAPI<PublicacionCrearResponse>> => {
    return publicacionService.crear(data, video);
  },

  editarPublicacion: async (publicacionId: string, data: PublicacionEditarRequest): Promise<RespuestaAPI<Publicacion>> => {
    return publicacionService.editar(publicacionId, data);
  },

  eliminarPublicacion: async (publicacionId: string): Promise<RespuestaAPI<{msg: string}>> => {
    return publicacionService.eliminar(publicacionId);
  },

  encontrarPublicacion: async (publicacionId: string): Promise<Publicacion | null> => {
    try {
      const response = await publicacionService.obtener(publicacionId);
      return response.data || null;
    } catch {
      return null;
    }
  },
};
