/** Servicio para la gestión de comentarios */

import api from './api';
import { handleApiError, handleApiSuccess } from './baseService';
import { ComentarioCrearRequest } from '../types/comentario';
import { RespuestaAPI } from '../types/response';

export const comentarioService = {
  /**
   * Agrega un comentario a una publicación
   */
  crear: async (
    publicacionId: string, 
    data: ComentarioCrearRequest
  ): Promise<RespuestaAPI> => {
    try {
      const response = await api.post(`/comentario/comentar/${publicacionId}`, data, {
        headers: { 'Content-Type': 'application/json' },
      });
      
      return handleApiSuccess(response, 'Comentario agregado exitosamente');
    } catch (error) {
      return handleApiError(error);
    }
  },
};
