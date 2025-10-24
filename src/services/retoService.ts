import api from './api';
import { RetoCrear, RetoActualizar, RetoConPublicacion} from '../types/reto';
import { RespuestaAPI } from '../types/response';

export const retoService = {
  crear: async (data: RetoCrear): Promise<RespuestaAPI> => {
    try {
      const response = await api.post('/reto/crear', data);
      return {
        message: response.data.msg || 'Reto creado exitosamente',
        data: response.data
      };
    } catch (error: any) {
      let message = 'Error al crear el reto';
      
      if (error.response) {
        message = error.response.data?.msg || `Error ${error.response.status}: ${error.response.statusText}`;
      } else if (error.request) {
        message = 'No se pudo conectar con el servidor. Verifica que la API esté ejecutándose.';
      } else {
        message = error.message || 'Error desconocido al crear el reto';
      }
      
      return {
        message,
        data: null
      };
    }
  },

  crearConPublicacion: async (data: RetoConPublicacion): Promise<RespuestaAPI> => {
    try {
      const formData = new FormData();
      formData.append('titulo_reto', data.titulo_reto);
      formData.append('descripcion_reto', data.descripcion_reto);
      formData.append('titulo_publicacion', data.titulo_publicacion);
      formData.append('descripcion_publicacion', data.descripcion_publicacion);
      formData.append('video', data.video);
      console.log(formData);
      const response = await api.post('/reto/crear-con-publicacion', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return {
        message: response.data.msg || 'Reto y publicación creados exitosamente',
        data: response.data
      };
    } catch (error: any) {
      let message = 'Error al crear el reto con publicación';
      
      if (error.response) {
        message = error.response.data?.msg || `Error ${error.response.status}: ${error.response.statusText}`;
      } else if (error.request) {
        message = 'No se pudo conectar con el servidor. Verifica que la API esté ejecutándose.';
      } else {
        message = error.message || 'Error desconocido al crear el reto';
      }
      
      return {
        message,
        data: null
      };
    }
  },

  listar: async (activos: boolean = true, limit: number = 20, offset: number = 0): Promise<RespuestaAPI> => {
    try {
      const params = new URLSearchParams({
        activos: activos.toString(),
        limit: limit.toString(),
        offset: offset.toString()
      });
      

      const response = await api.get(`/reto/listar?${params}`);
      return {
        message: 'Retos obtenidos exitosamente',
        data: response.data
      };
    } catch (error: any) {
      let message = 'Error al obtener los retos';
      
      if (error.response) {
        message = error.response.data?.msg || `Error ${error.response.status}: ${error.response.statusText}`;
      } else if (error.request) {
        message = 'No se pudo conectar con el servidor. Verifica que la API esté ejecutándose.';
      } else {
        message = error.message || 'Error desconocido al obtener los retos';
      }
      
      return {
        message,
        data: null
      };
    }
  },

  obtener: async (retoId: string): Promise<RespuestaAPI> => {
    try {
      const response = await api.get(`/reto/${retoId}`);
      return {
        message: 'Reto obtenido exitosamente',
        data: response.data
      };
    } catch (error: any) {
      let message = 'Error al obtener el reto';
      
      if (error.response) {
        message = error.response.data?.msg || `Error ${error.response.status}: ${error.response.statusText}`;
      } else if (error.request) {
        message = 'No se pudo conectar con el servidor. Verifica que la API esté ejecutándose.';
      } else {
        message = error.message || 'Error desconocido al obtener el reto';
      }
      
      return {
        message,
        data: null
      };
    }
  },

  obtenerRetosUsuario: async (usuarioId: string, limit: number = 20, offset: number = 0): Promise<RespuestaAPI> => {
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString()
      });

      const response = await api.get(`/reto/usuario/${usuarioId}?${params}`);
      return {
        message: 'Retos del usuario obtenidos exitosamente',
        data: response.data
      };
    } catch (error: any) {
      let message = 'Error al obtener los retos del usuario';
      
      if (error.response) {
        message = error.response.data?.msg || `Error ${error.response.status}: ${error.response.statusText}`;
      } else if (error.request) {
        message = 'No se pudo conectar con el servidor. Verifica que la API esté ejecutándose.';
      } else {
        message = error.message || 'Error desconocido al obtener los retos del usuario';
      }
      
      return {
        message,
        data: null
      };
    }
  },

  actualizar: async (retoId: string, data: RetoActualizar): Promise<RespuestaAPI> => {
    try {
      const response = await api.put(`/reto/${retoId}`, data);
      return {
        message: response.data.msg || 'Reto actualizado exitosamente',
        data: response.data
      };
    } catch (error: any) {
      let message = 'Error al actualizar el reto';
      
      if (error.response) {
        message = error.response.data?.msg || `Error ${error.response.status}: ${error.response.statusText}`;
      } else if (error.request) {
        message = 'No se pudo conectar con el servidor. Verifica que la API esté ejecutándose.';
      } else {
        message = error.message || 'Error desconocido al actualizar el reto';
      }
      
      return {
        message,
        data: null
      };
    }
  },

  eliminar: async (retoId: string): Promise<RespuestaAPI> => {
    try {
      const response = await api.delete(`/reto/${retoId}`);
      return {
        message: response.data.msg || 'Reto eliminado exitosamente',
        data: response.data
      };
    } catch (error: any) {
      let message = 'Error al eliminar el reto';
      
      if (error.response) {
        message = error.response.data?.msg || `Error ${error.response.status}: ${error.response.statusText}`;
      } else if (error.request) {
        message = 'No se pudo conectar con el servidor. Verifica que la API esté ejecutándose.';
      } else {
        message = error.message || 'Error desconocido al eliminar el reto';
      }
      
      return {
        message,
        data: null
      };
    }
  }
};
