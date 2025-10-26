import api from './api';
import { handleApiError } from './baseService';
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
    } catch (error) {
      return handleApiError(error);
    }
  },

  resetPassword: async (data: PasswordResetRequest): Promise<RespuestaAPI> => {
    try {
      const response = await api.post('/password-recovery/reset', data);
      return {
        message: response.data.msg || 'Contraseña actualizada exitosamente',
        data: response.data
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  validateToken: async (token: string): Promise<TokenValidationResponse> => {
    try {
      const response = await api.get(`/password-recovery/validate-token/${token}`);
      return {
        valid: response.data.valid,
        msg: response.data.msg
      };
    } catch (error) {
      return {
        valid: false,
        msg: handleApiError(error).message
      };
    }
  }
};
