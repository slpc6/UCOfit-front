// Pagina de inicio de la aplicacion


//External imports
import { useState, useEffect } from 'react';
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
import { HomeContainer, StyledPaper, PublicacionGrid, PublicacionCard } from './styles/Home.styles';
import CommentIcon from '@mui/icons-material/Comment';
import StarIcon from '@mui/icons-material/Star';


//Internal imports
import { publicacionService } from '../../services/publicacionService';
import { Publicacion } from '../../types/publicacion';
import { puntuacionService } from '../../services/puntuacionService';
import { comentarioService } from '../../services/comentarioService';


const Home = () => {
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openComments, setOpenComments] = useState<string | null>(null);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [enviandoComentario, setEnviandoComentario] = useState(false);
  const [ratingValue, setRatingValue] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const data = await publicacionService.listarPublicaciones();
        setPublicaciones(data);
      } catch (err) {
        setError('Error al cargar publicaciones');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicaciones();
  }, []);

  const handleComentarioSubmit = async () => {
    if (!openComments || !nuevoComentario.trim()) return;
    
    setEnviandoComentario(true);
    try {
      await comentarioService.comentarPublicacion(openComments, nuevoComentario);
      // Recargar publicaciones para obtener el comentario nuevo
      const data = await publicacionService.listarPublicaciones();
      setPublicaciones(data);
      setNuevoComentario('');
    } catch (err) {
      console.error(err);
    } finally {
      setEnviandoComentario(false);
    }
  };

  const handleRating = async (publicacionId: string, newValue: number | null) => {
    if (!newValue || !publicacionId) return;
    
    try {
      await puntuacionService.puntuarPublicacion(publicacionId, newValue);
      // Actualizar estado local
      setRatingValue(prev => ({
        ...prev,
        [publicacionId]: newValue
      }));
      // Actualizar publicaciones
      const updatedPublicaciones = publicaciones.map(pub => 
        pub._id === publicacionId ? { ...pub, puntuacion: newValue } : pub
      );
      setPublicaciones(updatedPublicaciones);
    } catch (err) {
      console.error('Error al puntuar:', err);
      setError('Error al enviar puntuación');
    }
  };

  const getVideoEmbedUrl = (url: string) => {
    // Convertir URL de YouTube a URL embebible
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    else{
      url = '';
    }
    return url;
  };

  if (loading) {
    return (
      <HomeContainer sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </HomeContainer>
    );
  }

  return (
    <HomeContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <StyledPaper elevation={3}>
          <Typography 
            variant="h1" 
            component="h1"
            sx={{
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' }
            }}
          >
            Bienvenido a UCOfit
          </Typography>
          <Typography 
            variant="h4"
            sx={{ 
              mt: 4, 
              opacity: 0.9,
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
            }}
          >
            Tu compañero perfecto para mantenerte en forma
          </Typography>
        </StyledPaper>

        {error && <Alert severity="error" sx={{ mt: 2, mb: 2 }}>{error}</Alert>}

        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ mt: 6, mb: 3, fontWeight: 'bold' }}
        >
          Publicaciones Recientes
        </Typography>

        <PublicacionGrid>
          {publicaciones.map((publicacion, index) => (
            <motion.div
              key={publicacion._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PublicacionCard>
                <CardMedia
                  component="iframe"
                  height="200"
                  src={getVideoEmbedUrl(publicacion.video)}
                  sx={{ border: 'none' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {publicacion.titulo}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {publicacion.descripcion}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{ display: 'block', mt: 2 }}
                  >
                    Por: {publicacion.usuario_id}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Button 
                    startIcon={<CommentIcon />}
                    variant="outlined" 
                    size="small"
                    onClick={() => setOpenComments(publicacion._id || null)}
                  >
                    Comentarios
                  </Button>
                  <Rating
                    value={ratingValue[publicacion._id || ''] || publicacion.puntuacion}
                    onChange={(_, newValue) => publicacion._id && handleRating(publicacion._id, newValue)}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                  />
                </CardActions>
              </PublicacionCard>
            </motion.div>
          ))}
        </PublicacionGrid>

        {/* Diálogo de comentarios */}
        <Dialog 
          open={!!openComments} 
          onClose={() => setOpenComments(null)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Comentarios</DialogTitle>
          <DialogContent dividers>
            {openComments && 
             publicaciones.find(p => p._id === openComments)?.comentarios ? 
              (Object.entries(publicaciones.find(p => p._id === openComments)?.comentarios || {}).length > 0 ? 
                Object.entries(publicaciones.find(p => p._id === openComments)?.comentarios || {}).map(([id, comentario]) => (
                  <Box key={id} sx={{ mb: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                    <Typography variant="subtitle2">{comentario.usuario}</Typography>
                    <Typography variant="body1">{comentario.texto}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(comentario.fecha).toLocaleString()}
                    </Typography>
                  </Box>
                ))
                : 
                <Typography variant="body1" sx={{ py: 2 }}>
                  No hay comentarios aún. ¡Sé el primero en comentar!
                </Typography>
              )
              : 
              <Typography variant="body1" sx={{ py: 2 }}>
                No hay comentarios aún. ¡Sé el primero en comentar!
              </Typography>
            }
            <Box sx={{ mt: 3 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Añadir comentario"
                value={nuevoComentario}
                onChange={(e) => setNuevoComentario(e.target.value)}
                disabled={enviandoComentario}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenComments(null)}>
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

export default Home;