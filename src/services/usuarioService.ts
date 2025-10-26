/** Servicio para la gestión de usuarios */

import api from './api';
import { handleApiError, handleApiSuccess } from './baseService';
import { Usuario, UsuarioActualizar } from '../types/usuario';
import { AuthResponse, RespuestaAPI } from '../types/response';

export const userService = {

  registrar: async (data: Usuario): Promise<RespuestaAPI<AuthResponse>> => {
    try {
      const response = await api.post<AuthResponse>('/usuario/registrar', data);
      return handleApiSuccess(response, 'Usuario registrado exitosamente') as RespuestaAPI<AuthResponse>;
    } catch (error) {
      return handleApiError(error) as RespuestaAPI<AuthResponse>;
    }
  },

  perfil: async (): Promise<RespuestaAPI<{usuario: Usuario}>> => {
    try {
      const response = await api.get('/usuario/perfil/');
      return handleApiSuccess(response, 'Perfil obtenido exitosamente') as RespuestaAPI<{usuario: Usuario}>;
    } catch (error) {
      return handleApiError(error) as RespuestaAPI<{usuario: Usuario}>;
    }
  },

  actualizar: async (data: UsuarioActualizar): Promise<RespuestaAPI> => {
    try {
      const response = await api.put('/usuario/actualizar', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return handleApiSuccess(response, 'Usuario actualizado exitosamente');
    } catch (error) {
      return handleApiError(error);
    }
  },

  eliminar: async (): Promise<RespuestaAPI> => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.delete(`usuario/eliminar/${token}`);
      return handleApiSuccess(response, 'Usuario eliminado exitosamente');
    } catch (error) {
      return handleApiError(error);
    }
  },
};