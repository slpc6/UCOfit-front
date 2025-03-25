// Servicio para la gestion de puntuaciones

//Internal imports
import api from './api';


export const puntuacionService = {
    puntuarPublicacion: async (publicacionId: string, puntuacion: number) => {
        const params = new URLSearchParams({ puntuacion: puntuacion.toString() });
        const response = await api.post(`/puntuacion/puntuar/${publicacionId}?${params.toString()}`);
        return response.data;
    }
};
