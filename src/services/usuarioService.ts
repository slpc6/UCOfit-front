import api from './api';
import { AuthResponse, Usuario } from '../types/usuario';

export const userService = {
  registrar: async (data: Usuario): Promise<AuthResponse> => {
    const formData = new URLSearchParams();
    formData.append('nombre', data.nombre);
    formData.append('apellido',data.apellido );
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('descripcion', data.descripcion);
    
    const response = await api.post<AuthResponse>('/usuario/registrar', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  }
  

};