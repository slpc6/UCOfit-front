import api from './api';
import { handleApiError, handleApiSuccess } from './baseService';
import { RespuestaAPI } from '../types/response';
import { Usuario } from '../types/usuario';
import { UsuarioRanking } from '../types/reto';

export const rankingService = {
  obtenerRankingGeneral: async (limit: number = 50, offset: number = 0): Promise<RespuestaAPI<{ranking: UsuarioRanking[], total: number, total_paginas: number, pagina_actual: number}>> => {
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString()
      });

      const response = await api.get(`/ranking/general?${params}`);
      return handleApiSuccess(response, 'Ranking obtenido exitosamente') as RespuestaAPI<{ranking: UsuarioRanking[], total: number, total_paginas: number, pagina_actual: number}>;
    } catch (error) {
      return handleApiError(error) as RespuestaAPI<{ranking: UsuarioRanking[], total: number, total_paginas: number, pagina_actual: number}>;
    }
  },

  obtenerPuntuacionUsuario: async (usuarioId: string): Promise<RespuestaAPI> => {
    try {
      const response = await api.get(`/ranking/usuario/${usuarioId}`);
      return handleApiSuccess(response, 'Puntuación del usuario obtenida exitosamente');
    } catch (error) {
      return handleApiError(error);
    }
  },

  obtenerMiPuntuacion: async (): Promise<RespuestaAPI<{usuario: Usuario & {puntuacion_total: number, posicion: number, total_publicaciones: number, promedio_puntuacion: number, publicaciones_con_puntuacion: number}}>> => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/ranking/mi-puntuacion', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return handleApiSuccess(response, 'Tu puntuación obtenida exitosamente') as RespuestaAPI<{usuario: Usuario & {puntuacion_total: number, posicion: number, total_publicaciones: number, promedio_puntuacion: number, publicaciones_con_puntuacion: number}}>;
    } catch (error) {
      return handleApiError(error) as RespuestaAPI<{usuario: Usuario & {puntuacion_total: number, posicion: number, total_publicaciones: number, promedio_puntuacion: number, publicaciones_con_puntuacion: number}}>;
    }
  },

  obtenerTopUsuarios: async (limit: number = 10): Promise<RespuestaAPI> => {
    try {
      const params = new URLSearchParams({
        limit: limit.toString()
      });

      const response = await api.get(`/ranking/top?${params}`);
      return handleApiSuccess(response, 'Top de usuarios obtenido exitosamente');
    } catch (error) {
      return handleApiError(error);
    }
  }
};