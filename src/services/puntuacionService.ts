// Servicio para la gestión de puntuaciones

//Internal imports
import api from './api';

export interface PuntuacionData {
    usuario_id: string;
    puntuacion: number;
}

export interface PuntuacionResponse {
    promedio: number;
    total_puntuaciones: number;
    puntuaciones: Array<{
        usuario_id: string;
        puntuacion: number;
        fecha: string;
    }>;
}

export const puntuacionService = {
    puntuarPublicacion: async (publicacionId: string, puntuacion: number) => {
        const puntuacionData: PuntuacionData = {
            usuario_id: '',
            puntuacion: puntuacion
        };

        const response = await api.post(
            `/puntuacion/puntuar/${publicacionId}`,
            puntuacionData,
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response.data;
    },

    obtenerPromedio: async (publicacionId: string): Promise<PuntuacionResponse> => {
        const response = await api.get(`/puntuacion/promedio/${publicacionId}`);
        return response.data;
    },

    eliminarPuntuacion: async (publicacionId: string) => {
        const response = await api.delete(`/puntuacion/eliminar/${publicacionId}`);
        return response.data;
    }
};