// Servicio para la gestion de autenticacion

//Internal imports
import api from './api';
import { User, AuthResponse } from '../types/user';


export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);
    
    const response = await api.post<AuthResponse>('/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  },
  
  register: async (userData: User) => {
    const response = await api.post('/usuario/registrar', userData);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/usuario/perfil');
    return response.data;
  },

  deleteAccount: async () => {
    const response = await api.delete('/usuario/eliminar');
    return response.data;
  }
};