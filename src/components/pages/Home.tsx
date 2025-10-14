// Pagina de inicio de la aplicacion

//External imports
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Typography, 
  CardContent, 
  CardActions, 
  Button, 
  CircularProgress,
  Alert,
  CardMedia
} from '@mui/material';
import { motion } from 'framer-motion';
import { HomeContainer, StyledPaper, PublicacionGrid, PublicacionCard } from './styles/Home.styles';
import VisibilityIcon from '@mui/icons-material/Visibility';


import { publicacionService } from '../../services/publicacionService';
import { Publicacion } from '../../types/publicacion';

const Home = () => {
  const navigate = useNavigate();
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
                {publicacion.video_url ? (
                  <CardMedia
                    component="video"
                    height="200"
                    src={publicacion.video_url}
                    sx={{ border: 'none' }}
                    controls
                  />
                ) : (
                  <div style={{ height: 200, backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Video no disponible
                    </Typography>
                  </div>
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {publicacion.titulo}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
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
                <CardActions sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                  <Button 
                    startIcon={<VisibilityIcon />}
                    variant="contained" 
                    size="large"
                    onClick={() => navigate(`/publicacion/${publicacion._id}`)}
                    fullWidth
                  >
                    Ver Detalles
                  </Button>
                </CardActions>
              </PublicacionCard>
            </motion.div>
          ))}
        </PublicacionGrid>
      </motion.div>
    </HomeContainer>
  );
};

export default Home;