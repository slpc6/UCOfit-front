// src/components/pages/VerPublicacion/hooks/usePuntuacion.ts
import { useState, useEffect } from 'react';
import { puntuacionService } from '../../../../services/puntuacionService';
import { Publicacion } from '../../../../types/publicacion';

export const usePuntuacion = (
  id: string | undefined,
  publicacion: Publicacion | null,
  setPublicacion: (pub: Publicacion) => void,
  setError: (msg: string) => void
) => {
  const [ratingValue, setRatingValue] = useState<number>(0);
  const [promedio, setPromedio] = useState<number>(0);
  const [totalPuntuaciones, setTotalPuntuaciones] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  // Cargar puntuaciones al montar el componente
  useEffect(() => {
    if (id) {
      cargarPuntuaciones();
    }
  }, [id]);

  const cargarPuntuaciones = async () => {
    if (!id) return;
    
    try {
      const response = await puntuacionService.obtenerPromedio(id);
      setPromedio(response.promedio);
      setTotalPuntuaciones(response.total_puntuaciones);
      setRatingValue(response.promedio);
      
      // Actualizar la publicación con el promedio
      if (publicacion) {
        setPublicacion({ ...publicacion, puntuacion: response.promedio });
      }
    } catch (err) {
      console.error('Error al cargar puntuaciones:', err);
    }
  };

  const handleRating = async (newValue: number | null) => {
    if (!newValue || !id) return;
    
    setLoading(true);
    try {
      const response = await puntuacionService.puntuarPublicacion(id, newValue);
      setPromedio(response.promedio);
      setTotalPuntuaciones(response.total_puntuaciones);
      setRatingValue(response.promedio);
      
      if (publicacion) {
        setPublicacion({ ...publicacion, puntuacion: response.promedio });
      }
    } catch (err: any) {
      console.error('Error al puntuar:', err);
      const errorMsg = err.response?.data?.msg || 'Error al enviar puntuación';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return {
    ratingValue,
    promedio,
    totalPuntuaciones,
    loading,
    handleRating,
    cargarPuntuaciones,
  };
};
