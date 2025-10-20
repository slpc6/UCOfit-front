import api from './api';
import { Usuario } from '../types/usuario';
import { AuthResponse, RespuestaAPI } from '../types/response';

export const userService = {
  registrar: async (data: Usuario): Promise<AuthResponse> => {
    
    const response = await api.post<AuthResponse>('/usuario/registrar', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },
  perfil: async (): Promise<RespuestaAPI> => {
    const token = localStorage.getItem('token')
    try {
      const response = await api.get('/usuario/perfil/',{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        message: 'Datos enviados exitosamente',
        data: response.data
      };
    } catch (error: any) {
      let message = 'Error al enviar los datos';
      
      if (error.response) {
        message = error.response.data?.message || `Error ${error.response.status}: ${error.response.statusText}`;
      } else if (error.request) {
        message = 'No se pudo conectar con el servidor. Verifica que la API esté ejecutándose.';
      } else {
        message = error.message || 'Error desconocido al enviar los datos';
      }
      
      return {
        message,
        data: null
      };
    }
  },
  eliminar: async (): Promise<RespuestaAPI> => {
    const token = localStorage.getItem('token')
    try {
      const response = await api.delete('usuario/eliminar/'+ token);
      return {
        message: 'Datos enviados exitosamente',
        data: response.data
      };
    } catch (error: any) {
      let message = 'Error al enviar los datos';
      
      if (error.response) {
        message = error.response.data?.message || `Error ${error.response.status}: ${error.response.statusText}`;
      } else if (error.request) {
        message = 'No se pudo conectar con el servidor. Verifica que la API esté ejecutándose.';
      } else {
        message = error.message || 'Error desconocido al enviar los datos';
      }
      
      return {
        message,
        data: null
      };
    }
  }
  

};