// src/components/pages/Publicacion/hooks/useEditarPublicacion.ts
import { useState } from 'react';
import { publicacionService } from '../../../../services/publicacionService';

export const useEditarPublicacion = (
  setError: (msg: string) => void
) => {
  const [loading, setLoading] = useState(false);

  const editarPublicacion = async (
    publicacionId: string, 
    datos: { titulo?: string; descripcion?: string }
  ) => {
    setLoading(true);
    try {
      const response = await publicacionService.editarPublicacion(publicacionId, datos);
      return response;
    } catch (err: any) {
      console.error('Error al editar publicación:', err);
      const errorMsg = err.response?.data?.msg || 'Error al editar la publicación';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const eliminarPublicacion = async (publicacionId: string) => {
    setLoading(true);
    try {
      const response = await publicacionService.eliminarPublicacion(publicacionId);
      return response;
    } catch (err: any) {
      console.error('Error al eliminar publicación:', err);
      const errorMsg = err.response?.data?.msg || 'Error al eliminar la publicación';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    editarPublicacion,
    eliminarPublicacion,
  };
};
