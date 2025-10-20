// src/components/pages/VerPublicacion/VerPublicacion.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  CardContent,
  CardActions,
  Button,
  Rating,
  CircularProgress,
  Alert,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { HomeContainer, PublicacionCard } from '../styles/Home.styles';

// Hooks
import { usePublicacion } from './hooks/usePublicacion';
import { useComentarios } from './hooks/useComentarios';
import { usePuntuacion } from './hooks/usePuntuacion';
import { useEditarPublicacion } from './hooks/useEditarPublicacion';

// Components
import EditarPublicacion from './EditarPublicacion';
// Services
import { userService } from '../../../services/usuarioService';

const VerPublicacion = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Hook principal de publicación
  const { publicacion, setPublicacion, loading, error, setError } = usePublicacion(id);

  // Comentarios
  const {
    openComments,
    setOpenComments,
    nuevoComentario,
    setNuevoComentario,
    enviandoComentario,
    handleComentarioSubmit,
  } = useComentarios(id, (p) => setPublicacion(p), setError);

  // Puntuación
  const { ratingValue, promedio, totalPuntuaciones, loading: puntuacionLoading, handleRating } = usePuntuacion(id, publicacion, (p) => setPublicacion(p), setError);

  // Editar/Eliminar
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const { loading: editLoading, eliminarPublicacion } = useEditarPublicacion(setError);
  const [isOwner, setIsOwner] = useState(false);

  // Determinar si el usuario autenticado es el dueño de la publicación
  useEffect(() => {
    let isMounted = true;
    const checkOwner = async () => {
      try {
        const perfil = await userService.perfil();
        const email = perfil?.data?.usuario?.email || perfil?.data?.email;
        if (isMounted && publicacion) {
          setIsOwner(!!email && email === publicacion.usuario_id);
        }
      } catch (e) {
        if (isMounted) setIsOwner(false);
      }
    };
    checkOwner();
    return () => {
      isMounted = false;
    };
  }, [publicacion]);

  const handleEliminar = async () => {
    if (!id || !publicacion) return;
    
    if (window.confirm('¿Estás seguro de que quieres eliminar esta publicación? Esta acción no se puede deshacer.')) {
      try {
        await eliminarPublicacion(id);
        navigate('/home');
      } catch (err) {
        // El error ya se maneja en el hook
      }
    }
  };

  const handleEditSuccess = () => {
    // Recargar la publicación después de editar
    window.location.reload();
  };

  if (loading) {
    return (
      <HomeContainer sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </HomeContainer>
    );
  }

  if (error || !publicacion) {
    return (
      <HomeContainer>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/home')} variant="outlined">
          Volver al inicio
        </Button>
      </HomeContainer>
    );
  }

  return (
    <HomeContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}
      >
        <Box sx={{ mb: 3 }}>
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/home')} variant="outlined">
            Volver al inicio
          </Button>
        </Box>

        <PublicacionCard sx={{ mb: 4 }}>
          {publicacion.video ? (
            <CardMedia
              component="video"
              height="400"
              src={publicacion.video_url}
              sx={{ border: 'none' }}
              controls
            />
          ) : (
            <Box
              sx={{
                height: 400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#f5f5f5',
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Video no disponible
              </Typography>
            </Box>
          )}

          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              {publicacion.titulo}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, fontSize: '1.1rem' }}>
              {publicacion.descripcion}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              Por: {publicacion.usuario_id}
            </Typography>
            
            {/* Botones de editar y eliminar - solo para el autor */}
            {isOwner && (
              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                <Button
                  startIcon={<EditIcon />}
                  variant="outlined"
                  color="primary"
                  onClick={() => setOpenEditDialog(true)}
                  disabled={editLoading}
                >
                  Editar
                </Button>
                <Button
                  startIcon={<DeleteIcon />}
                  variant="outlined"
                  color="error"
                  onClick={handleEliminar}
                  disabled={editLoading}
                >
                  Eliminar
                </Button>
              </Box>
            )}
          </CardContent>

          <CardActions
            sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Button
              startIcon={<CommentIcon />}
              variant="contained"
              size="large"
              onClick={() => setOpenComments(true)}
            >
              Ver Comentarios ({Array.isArray(publicacion.comentarios) ? publicacion.comentarios.length : 0})
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body1" sx={{ mr: 1 }}>
                Puntuación:
              </Typography>
              <Rating
                value={ratingValue}
                onChange={(_, newValue) => handleRating(newValue)}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                size="large"
                disabled={puntuacionLoading}
              />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {promedio.toFixed(1)} ({totalPuntuaciones} votos)
              </Typography>
            </Box>
          </CardActions>
        </PublicacionCard>

        <Dialog open={openComments} onClose={() => setOpenComments(false)} fullWidth maxWidth="md">
          <DialogTitle>Comentarios</DialogTitle>
          <DialogContent dividers>
            {publicacion.comentarios && Array.isArray(publicacion.comentarios) && publicacion.comentarios.length > 0 ? (
              publicacion.comentarios.map((comentario, index) => (
                <Box key={comentario.comentario_id || index} sx={{ mb: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    {comentario.usuario_id}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {comentario.comentario}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 1, display: 'block' }}
                  >
                    {new Date(comentario.fecha).toLocaleString()}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body1" sx={{ py: 2, textAlign: 'center' }}>
                No hay comentarios aún. ¡Sé el primero en comentar!
              </Typography>
            )}

            <Box sx={{ mt: 3 }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Añadir comentario"
                value={nuevoComentario}
                onChange={(e) => setNuevoComentario(e.target.value)}
                disabled={enviandoComentario}
                placeholder="Escribe tu comentario aquí..."
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenComments(false)}>Cerrar</Button>
            <Button
              onClick={handleComentarioSubmit}
              variant="contained"
              disabled={!nuevoComentario.trim() || enviandoComentario}
            >
              {enviandoComentario ? <CircularProgress size={24} /> : 'Comentar'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog para editar publicación */}
        <EditarPublicacion
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          publicacion={publicacion}
          onSuccess={handleEditSuccess}
          setError={setError}
        />
      </motion.div>
    </HomeContainer>
  );
};

export default VerPublicacion;
