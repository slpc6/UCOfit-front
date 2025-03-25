// Servicio para la gestion de comentarios

//Internal imports
import api from './api';


export const comentarioService = {
    comentarPublicacion: async (publicacionId: string, comentario: string) => {
        const params = new URLSearchParams({ comentario });
        const response = await api.post(`/comentario/comentar/${publicacionId}?${params.toString()}`);
        return response.data;
    }
};
