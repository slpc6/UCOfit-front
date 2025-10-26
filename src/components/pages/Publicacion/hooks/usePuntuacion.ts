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
      setPromedio(response.promedio);
      setTotalPuntuaciones(response.total_puntuaciones);
      setRatingValue(response.promedio);
      
      // Actualizar la publicación con el promedio usando refs
      if (publicacionRef.current) {
        setPublicacionRef.current({ ...publicacionRef.current, puntuacion_promedio: response.promedio });
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
      setPromedio(response.promedio);
      setTotalPuntuaciones(response.total_puntuaciones);
      setRatingValue(response.promedio);
      
      if (publicacion) {
        setPublicacion({ ...publicacion, puntuacion_promedio: response.promedio });
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
