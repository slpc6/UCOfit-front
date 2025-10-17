// Servicio para la gestion de puntuaciones

//Internal imports
import api from './api';
import { Usuario } from '../types/usuario';

interface RankingResponse {
    usuarios: Usuario[];
}

export const puntuacionService = {
    puntuarPublicacion: async (publicacionId: string, puntuacion: number) => {
        const params = new URLSearchParams({ puntuacion: puntuacion.toString() });
        const response = await api.post(`/puntuacion/puntuar/${publicacionId}?${params.toString()}`);
        return response.data;
    },
    rankingUsuarios: async (): Promise<RankingResponse> => {
        const response = await api.get<RankingResponse>('/puntuacion/ranking_usuarios');
        return response.data;
    }
};
