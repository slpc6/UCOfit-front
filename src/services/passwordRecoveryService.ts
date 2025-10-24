import api from './api';
import { PasswordRecoveryRequest, PasswordResetRequest, TokenValidationResponse } from '../types/passwordRecovery';
import { RespuestaAPI } from '../types/response';

export const passwordRecoveryService = {
  requestRecovery: async (data: PasswordRecoveryRequest): Promise<RespuestaAPI> => {
    try {
      const response = await api.post('/password-recovery/request', data);
      return {
        message: response.data.msg || 'Solicitud enviada exitosamente',
        data: response.data
      };
    } catch (error: any) {
      let message = 'Error al enviar la solicitud de recuperación';
      
      if (error.response) {
        message = error.response.data?.msg || `Error ${error.response.status}: ${error.response.statusText}`;
      } else if (error.request) {
        message = 'No se pudo conectar con el servidor. Verifica que la API esté ejecutándose.';
      } else {
        message = error.message || 'Error desconocido al enviar la solicitud';
      }
      
      return {
        message,
        data: null
      };
    }
  },

  resetPassword: async (data: PasswordResetRequest): Promise<RespuestaAPI> => {
    try {
      const response = await api.post('/password-recovery/reset', data);
      return {
        message: response.data.msg || 'Contraseña actualizada exitosamente',
        data: response.data
      };
    } catch (error: any) {
      let message = 'Error al actualizar la contraseña';
      
      if (error.response) {
        message = error.response.data?.detail || error.response.data?.msg || `Error ${error.response.status}: ${error.response.statusText}`;
      } else if (error.request) {
        message = 'No se pudo conectar con el servidor. Verifica que la API esté ejecutándose.';
      } else {
        message = error.message || 'Error desconocido al actualizar la contraseña';
      }
      
      return {
        message,
        data: null
      };
    }
  },

  validateToken: async (token: string): Promise<TokenValidationResponse> => {
    try {
      const response = await api.get(`/password-recovery/validate-token/${token}`);
      return {
        valid: response.data.valid,
        msg: response.data.msg
      };
    } catch (error: any) {
      return {
        valid: false,
        msg: 'Error al validar el token'
      };
    }
  }
};
