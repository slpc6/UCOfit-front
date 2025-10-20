// Servicio para la gestion de comentarios

//Internal imports
import api from './api';


export const comentarioService = {
    comentarPublicacion: async (publicacionId: string, comentarioTexto: string) => {

        const comentarioPayload = {
            comentario_id: '',
            usuario_id: '',
            comentario: comentarioTexto,
            fecha: new Date().toISOString()
        };

        const response = await api.post(
            `/comentario/comentar/${publicacionId}`,
            comentarioPayload,
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response.data;
    }
};
