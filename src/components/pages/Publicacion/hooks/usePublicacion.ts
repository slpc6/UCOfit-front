// src/components/pages/VerPublicacion/hooks/usePublicacion.ts
import { useState, useEffect } from 'react';
import { publicacionService } from '../../../../services/publicacionService';
import { Publicacion } from '../../../../types/publicacion';

export const usePublicacion = (id: string | undefined) => {
  const [publicacion, setPublicacion] = useState<Publicacion | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchPublicacion = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await publicacionService.listarPublicaciones();
        const encontrada = data.find((p) => p._id === id);
        if (encontrada) {
          setPublicacion(encontrada);
        } else {
          setError('Publicación no encontrada');
        }
      } catch (err) {
        console.error(err);
        setError('Error al cargar la publicación');
      } finally {
        setLoading(false);
      }
    };

    fetchPublicacion();
  }, [id]);

  return {
    publicacion,
    setPublicacion,
    loading,
    error,
    setError,
  };
};
