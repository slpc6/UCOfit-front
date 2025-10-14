// Página para ver una publicación en detalle

//External imports
import { useState, useEffect } from 'react';
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
  Box
} from '@mui/material';
import { motion } from 'framer-motion';
import CommentIcon from '@mui/icons-material/Comment';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

//Internal imports
import { publicacionService } from '../../../services/publicacionService';
import { Publicacion } from '../../../types/publicacion';
import { puntuacionService } from '../../../services/puntuacionService';
import { comentarioService } from '../../../services/comentarioService';
import { HomeContainer, PublicacionCard } from '../styles/Home.styles';

const VerPublicacion = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [publicacion, setPublicacion] = useState<Publicacion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openComments, setOpenComments] = useState(false);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [enviandoComentario, setEnviandoComentario] = useState(false);
  const [ratingValue, setRatingValue] = useState<number>(0);

  useEffect(() => {
    const fetchPublicacion = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        // Por ahora obtenemos todas las publicaciones y filtramos por ID
        // En el futuro se puede crear un endpoint específico para obtener una publicación
        const data = await publicacionService.listarPublicaciones();
        const publicacionEncontrada = data.find(p => p._id === id);
        
        if (publicacionEncontrada) {
          setPublicacion(publicacionEncontrada);
          setRatingValue(publicacionEncontrada.puntuacion || 0);
        } else {
          setError('Publicación no encontrada');
        }
      } catch (err) {
        setError('Error al cargar la publicación');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicacion();
  }, [id]);

  const handleComentarioSubmit = async () => {
    if (!id || !nuevoComentario.trim()) return;
    
    setEnviandoComentario(true);
    try {
      await comentarioService.comentarPublicacion(id, nuevoComentario);
      const data = await publicacionService.listarPublicaciones();
      const publicacionActualizada = data.find(p => p._id === id);
      if (publicacionActualizada) {
        setPublicacion(publicacionActualizada);
      }
      setNuevoComentario('');
    } catch (err) {
      console.error(err);
      setError('Error al enviar comentario');
    } finally {
      setEnviandoComentario(false);
    }
  };

  const handleRating = async (newValue: number | null) => {
    if (!newValue || !id) return;
    
    try {
      await puntuacionService.puntuarPublicacion(id, newValue);
      setRatingValue(newValue);
      
      // Actualizar publicación local
      if (publicacion) {
        setPublicacion({ ...publicacion, puntuacion: newValue });
      }
    } catch (err) {
      console.error('Error al puntuar:', err);
      setError('Error al enviar puntuación');
    }
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
        <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
        <Button 
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          variant="outlined"
        >
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
          <Button 
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/home')}
            variant="outlined"
          >
            Volver al inicio
          </Button>
        </Box>


        <PublicacionCard sx={{ mb: 4 }}>
          {publicacion.video_url ? (
            <CardMedia
              component="video"
              height="400"
              src={publicacion.video_url}
              sx={{ border: 'none' }}
              controls
            />
          ) : (
            <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f5f5' }}>
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
          </CardContent>
          
          <CardActions sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button 
              startIcon={<CommentIcon />}
              variant="contained" 
              size="large"
              onClick={() => setOpenComments(true)}
            >
              Ver Comentarios ({Object.keys(publicacion.comentarios || {}).length})
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
              />
            </Box>
          </CardActions>
        </PublicacionCard>


        <Dialog 
          open={openComments} 
          onClose={() => setOpenComments(false)}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>Comentarios</DialogTitle>
          <DialogContent dividers>
            {publicacion.comentarios && Object.keys(publicacion.comentarios).length > 0 ? (
              Object.entries(publicacion.comentarios).map(([id, comentario]) => (
                <Box key={id} sx={{ mb: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    {comentario.usuario}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {comentario.texto}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
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
            <Button onClick={() => setOpenComments(false)}>
              Cerrar
            </Button>
            <Button 
              onClick={handleComentarioSubmit}
              variant="contained"
              disabled={!nuevoComentario.trim() || enviandoComentario}
            >
              {enviandoComentario ? <CircularProgress size={24} /> : 'Comentar'}
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </HomeContainer>
  );
};

export default VerPublicacion;
