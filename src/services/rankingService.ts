import api from './api';
import { RespuestaAPI } from '../types/response';

export const rankingService = {
  obtenerRankingGeneral: async (limit: number = 50, offset: number = 0): Promise<RespuestaAPI> => {
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString()
      });

      const response = await api.get(`/ranking/general?${params}`);
      return {
        message: 'Ranking obtenido exitosamente',
        data: response.data
      };
    } catch (error: any) {
      let message = 'Error al obtener el ranking';
      
      if (error.response) {
        message = error.response.data?.msg || `Error ${error.response.status}: ${error.response.statusText}`;
      } else if (error.request) {
        message = 'No se pudo conectar con el servidor. Verifica que la API esté ejecutándose.';
      } else {
        message = error.message || 'Error desconocido al obtener el ranking';
      }
      
      return {
        message,
        data: null
      };
    }
  },

  obtenerPuntuacionUsuario: async (usuarioId: string): Promise<RespuestaAPI> => {
    try {
      const response = await api.get(`/ranking/usuario/${usuarioId}`);
      return {
        message: 'Puntuación del usuario obtenida exitosamente',
        data: response.data
      };
    } catch (error: any) {
      let message = 'Error al obtener la puntuación del usuario';
      
      if (error.response) {
        message = error.response.data?.msg || `Error ${error.response.status}: ${error.response.statusText}`;
      } else if (error.request) {
        message = 'No se pudo conectar con el servidor. Verifica que la API esté ejecutándose.';
      } else {
        message = error.message || 'Error desconocido al obtener la puntuación';
      }
      
      return {
        message,
        data: null
      };
    }
  },

  obtenerMiPuntuacion: async (): Promise<RespuestaAPI> => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/ranking/mi-puntuacion', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        message: 'Tu puntuación obtenida exitosamente',
        data: response.data
      };
    } catch (error: any) {
      let message = 'Error al obtener tu puntuación';
      
      if (error.response) {
        message = error.response.data?.msg || `Error ${error.response.status}: ${error.response.statusText}`;
      } else if (error.request) {
        message = 'No se pudo conectar con el servidor. Verifica que la API esté ejecutándose.';
      } else {
        message = error.message || 'Error desconocido al obtener tu puntuación';
      }
      
      return {
        message,
        data: null
      };
    }
  },

  obtenerTopUsuarios: async (limit: number = 10): Promise<RespuestaAPI> => {
    try {
      const params = new URLSearchParams({
        limit: limit.toString()
      });

      const response = await api.get(`/ranking/top?${params}`);
      return {
        message: 'Top de usuarios obtenido exitosamente',
        data: response.data
      };
    } catch (error: any) {
      let message = 'Error al obtener el top de usuarios';
      
      if (error.response) {
        message = error.response.data?.msg || `Error ${error.response.status}: ${error.response.statusText}`;
      } else if (error.request) {
        message = 'No se pudo conectar con el servidor. Verifica que la API esté ejecutándose.';
      } else {
        message = error.message || 'Error desconocido al obtener el top de usuarios';
      }
      
      return {
        message,
        data: null
      };
    }
  }
};
