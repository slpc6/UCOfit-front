// Servicio para la gestion de autenticacion


import api from './api';
import { UsuarioLogin } from '../types/usuario';
import { AuthResponse } from '../types/response';


export const authService = {
  login: async (data: UsuarioLogin): Promise<AuthResponse> => {
    const formData = new URLSearchParams();
    formData.append('username', data.email);
    formData.append('password', data.password);
    
    const response = await api.post<AuthResponse>('/usuario/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  },
  logout: async (): Promise<AuthResponse> => {
    localStorage.removeItem('token');
    const response = await api.post<AuthResponse>('/usuario/logout', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  }
};