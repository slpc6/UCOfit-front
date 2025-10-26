// src/components/pages/VerPublicacion/hooks/usePuntuacion.ts
import { useState, useEffect, useCallback, useRef } from 'react';
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

  // Usar refs para evitar dependencias que cambian
  const publicacionRef = useRef(publicacion);
  const setPublicacionRef = useRef(setPublicacion);
  const setErrorRef = useRef(setError);

  // Actualizar refs cuando cambien
  publicacionRef.current = publicacion;
  setPublicacionRef.current = setPublicacion;
  setErrorRef.current = setError;

  const cargarPuntuaciones = useCallback(async () => {
    if (!id) return;
    
    try {
      const response = await puntuacionService.obtenerPromedio(id);
      const promedioValue = response.promedio || 0;
      const totalValue = response.total_puntuaciones || 0;
      
      setPromedio(promedioValue);
      setTotalPuntuaciones(totalValue);
      setRatingValue(promedioValue);
      
      // Actualizar la publicación con el promedio usando refs
      if (publicacionRef.current) {
        setPublicacionRef.current({ ...publicacionRef.current, puntuacion_promedio: promedioValue });
      }
    } catch (err) {
      setErrorRef.current(`Error al cargar puntuaciones. ${err}`);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      cargarPuntuaciones();
    }
  }, [id, cargarPuntuaciones]);

  const handleRating = async (newValue: number | null) => {
    if (!newValue || !id) return;
    
    setLoading(true);
    try {
      const response = await puntuacionService.puntuarPublicacion(id, newValue);
      const promedioValue = response.promedio || 0;
      const totalValue = response.total_puntuaciones || 0;
      
      setPromedio(promedioValue);
      setTotalPuntuaciones(totalValue);
      setRatingValue(promedioValue);
      
      if (publicacion) {
        setPublicacion({ ...publicacion, puntuacion_promedio: promedioValue });
      }
    } catch (err: unknown) {
      const errorMsg = (err as { response?: { data?: { msg?: string } } })?.response?.data?.msg || 'Error al enviar puntuación';
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
