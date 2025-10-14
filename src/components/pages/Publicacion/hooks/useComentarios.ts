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
      await comentarioService.comentarPublicacion(id, nuevoComentario);
      const data = await publicacionService.listarPublicaciones();
      const actualizada = data.find((p) => p._id === id);
      if (actualizada) {
        setPublicacion(actualizada);
      }
      setNuevoComentario('');
    } catch (err) {
      console.error(err);
      setError('Error al enviar comentario');
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
