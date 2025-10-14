// src/components/pages/VerPublicacion/hooks/usePuntuacion.ts
import { useState } from 'react';
import { puntuacionService } from '../../../../services/puntuacionService';
import { Publicacion } from '../../../../types/publicacion';

export const usePuntuacion = (
  id: string | undefined,
  publicacion: Publicacion | null,
  setPublicacion: (pub: Publicacion) => void,
  setError: (msg: string) => void
) => {
  const [ratingValue, setRatingValue] = useState<number>(publicacion?.puntuacion || 0);

  const handleRating = async (newValue: number | null) => {
    if (!newValue || !id) return;
    try {
      await puntuacionService.puntuarPublicacion(id, newValue);
      setRatingValue(newValue);
      if (publicacion) {
        setPublicacion({ ...publicacion, puntuacion: newValue });
      }
    } catch (err) {
      console.error('Error al puntuar:', err);
      setError('Error al enviar puntuación');
    }
  };

  return {
    ratingValue,
    handleRating,
  };
};
