// Servicio para la gestion de autenticacion

//Internal imports
import api from './api';
import { UsuarioLogin, AuthResponse } from '../types/usuario';


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
    localStorage.setItem('token', '');
    const response = await api.post<AuthResponse>('/usuario/logout', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  }
};