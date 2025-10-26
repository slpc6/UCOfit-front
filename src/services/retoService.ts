/** Servicio para la gestión de retos */

import api from './api';
import { handleApiError, handleApiSuccess } from './baseService';
import { 
  Reto,
  RetoCrear, 
  RetoActualizar, 
  RetoConPublicacionRequest,
  RetoConPublicacionResponse 
} from '../types/reto';
import { RespuestaAPI } from '../types/response';

export const retoService = {

  crear: async (data: RetoCrear): Promise<RespuestaAPI> => {
    try {
      const response = await api.post('/reto/crear', data);
      return handleApiSuccess(response, 'Reto creado exitosamente');
    } catch (error) {
      return handleApiError(error);
    }
  },


  crearConPublicacion: async (
    data: RetoConPublicacionRequest, 
    video: File
  ): Promise<RespuestaAPI<RetoConPublicacionResponse>> => {
    try {
      const formData = new FormData();
      formData.append('titulo_reto', data.titulo_reto);
      formData.append('descripcion_reto', data.descripcion_reto);
      formData.append('titulo_publicacion', data.titulo_publicacion);
      formData.append('descripcion_publicacion', data.descripcion_publicacion);
      formData.append('video', video);

      const response = await api.post('/reto/crear-con-publicacion', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return handleApiSuccess(response, 'Reto y publicación creados exitosamente') as RespuestaAPI<RetoConPublicacionResponse>;
    } catch (error) {
      return handleApiError(error) as RespuestaAPI<RetoConPublicacionResponse>;
    }
  },


        listar: async (
          activos: boolean = true, 
          limit: number = 20, 
          offset: number = 0
        ): Promise<RespuestaAPI<{retos: Reto[], total: number, total_paginas: number, pagina_actual: number}>> => {
    try {
      const params = new URLSearchParams({
        activos: activos.toString(),
        limit: limit.toString(),
        offset: offset.toString(),
      });

      const response = await api.get(`/reto/listar?${params}`);
      return handleApiSuccess(response, 'Retos obtenidos exitosamente') as RespuestaAPI<{retos: Reto[], total: number, total_paginas: number, pagina_actual: number}>;
    } catch (error) {
      return handleApiError(error) as RespuestaAPI<{retos: Reto[], total: number, total_paginas: number, pagina_actual: number}>;
    }
  },


  obtener: async (retoId: string): Promise<RespuestaAPI<{reto: Reto, is_expired: boolean}>> => {
    try {
      const response = await api.get(`/reto/${retoId}`);
      return handleApiSuccess(response, 'Reto obtenido exitosamente') as RespuestaAPI<{reto: Reto, is_expired: boolean}>;
    } catch (error) {
      return handleApiError(error) as RespuestaAPI<{reto: Reto, is_expired: boolean}>;
    }
  },


  obtenerRetosUsuario: async (
    usuarioId: string, 
    limit: number = 20, 
    offset: number = 0
  ): Promise<RespuestaAPI> => {
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
      });

      const response = await api.get(`/reto/usuario/${usuarioId}?${params}`);
      return handleApiSuccess(response, 'Retos del usuario obtenidos exitosamente');
    } catch (error) {
      return handleApiError(error);
    }
  },


  actualizar: async (retoId: string, data: RetoActualizar): Promise<RespuestaAPI> => {
    try {
      const response = await api.put(`/reto/editar/${retoId}`, data);
      return handleApiSuccess(response, 'Reto actualizado exitosamente');
    } catch (error) {
      return handleApiError(error);
    }
  },


  eliminar: async (retoId: string): Promise<RespuestaAPI> => {
    try {
      const response = await api.delete(`/reto/eliminar/${retoId}`);
      return handleApiSuccess(response, 'Reto eliminado exitosamente');
    } catch (error) {
      return handleApiError(error);
    }
  },
};
