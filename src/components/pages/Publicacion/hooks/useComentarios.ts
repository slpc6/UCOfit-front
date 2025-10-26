// src/components/pages/VerPublicacion/hooks/useComentarios.ts
import { useState } from 'react';
import { comentarioService } from '../../../../services/comentarioService';
import { publicacionService } from '../../../../services/publicacionService';
import { Publicacion } from '../../../../types/publicacion';

export const useComentarios = (
  id: string | undefined,
  setPublicacion: (pub: Publicacion) => void,
  setError: (msg: string) => void
) => {
  const [openComments, setOpenComments] = useState(false);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [enviandoComentario, setEnviandoComentario] = useState(false);

  const handleComentarioSubmit = async () => {
    if (!id || !nuevoComentario.trim()) return;
    setEnviandoComentario(true);

    try {
      const comentarioData = {
        comentario: nuevoComentario,
        publicacion_id: id,
      };
      
      const resultado = await comentarioService.crear(id, comentarioData);
      
      if (resultado.data) {
        const actualizada = await publicacionService.obtener(id);
        if (actualizada.data) {
          setPublicacion(actualizada.data);
        }
        setNuevoComentario('');
      } else {
        setError(resultado.message || 'Error al enviar comentario');
      }
    } catch (err) {
      setError(`Error al enviar comentario. ${err}`);
    } finally {
      setEnviandoComentario(false);
    }
  };

  return {
    openComments,
    setOpenComments,
    nuevoComentario,
    setNuevoComentario,
    enviandoComentario,
    handleComentarioSubmit,
  };
};
