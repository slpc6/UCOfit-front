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
  CardMedia,
  Box,
  Grid,
  Card
} from '@mui/material';
import { motion } from 'framer-motion';
import { HomeContainer, StyledPaper, PublicacionGrid, PublicacionCard } from './styles/Home.styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import DashboardIcon from '@mui/icons-material/Dashboard';


import { publicacionService } from '../../services/publicacionService';
import { retoService } from '../../services/retoService';
import { Publicacion } from '../../types/publicacion';
import { Reto } from '../../types/reto';

const Home = () => {
  const navigate = useNavigate();
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [retos, setRetos] = useState<Reto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Cargar publicaciones
        const publicacionesData = await publicacionService.listarPublicaciones();
        setPublicaciones(publicacionesData);

        // Cargar retos activos (solo los primeros 6 para la página de inicio)
        const retosResponse = await retoService.listar(true, 6, 0);
        if (retosResponse.data) {
          setRetos(retosResponse.data.retos || []);
        }
      } catch (err) {
        setError('Error al cargar datos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

        {/* Navegación rápida */}
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography 
            variant="h5" 
            component="h2" 
            sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}
          >
            🚀 Acceso Rápido
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card 
                  sx={{ 
                    height: '100%', 
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6
                    }
                  }}
                  onClick={() => navigate('/reto/crearreto')}
                >
                  <CardContent sx={{ textAlign: 'center', py: 3 }}>
                    <AddIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Crear Reto
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Crea un nuevo reto y comparte tu primera publicación
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card 
                  sx={{ 
                    height: '100%', 
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6
                    }
                  }}
                  onClick={() => navigate('/reto/listarretos')}
                >
                  <CardContent sx={{ textAlign: 'center', py: 3 }}>
                    <ListIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Ver Retos
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Explora retos activos y únete a la comunidad
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card 
                  sx={{ 
                    height: '100%', 
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6
                    }
                  }}
                  onClick={() => navigate('/ranking')}
                >
                  <CardContent sx={{ textAlign: 'center', py: 3 }}>
                    <EmojiEventsIcon sx={{ fontSize: 40, color: 'warning.main', mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Ranking
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Ve quién lidera la competencia
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card 
                  sx={{ 
                    height: '100%', 
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6
                    }
                  }}
                  onClick={() => navigate('/dashboard')}
                >
                  <CardContent sx={{ textAlign: 'center', py: 3 }}>
                    <DashboardIcon sx={{ fontSize: 40, color: 'success.main', mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Mi Dashboard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Revisa tu progreso y estadísticas
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Box>

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

        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ mt: 6, mb: 3, fontWeight: 'bold' }}
        >
          Retos Activos
        </Typography>

        <PublicacionGrid>
          {retos.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4, gridColumn: '1 / -1' }}>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                No hay retos activos
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                ¡Sé el primero en crear un reto!
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/reto/crearreto')}
                sx={{
                  borderRadius: '8px',
                  background: 'linear-gradient(45deg, #1B5E20 30%, #4CAF50 90%)',
                  boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)',
                }}
              >
                Crear Mi Primer Reto
              </Button>
            </Box>
          ) : (
            retos.map((reto, index) => (
              <motion.div
                key={reto.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <PublicacionCard>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h3" gutterBottom>
                      🏆 {reto.titulo}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                      {reto.descripcion}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <Typography 
                        variant="caption" 
                        color={reto.dias_restantes <= 3 ? 'error.main' : reto.dias_restantes <= 7 ? 'warning.main' : 'success.main'}
                        sx={{ fontWeight: 'bold' }}
                      >
                        {reto.dias_restantes} días restantes
                      </Typography>
                    </Box>
                    <Typography 
                      variant="caption" 
                      color="text.secondary"
                      sx={{ display: 'block', mt: 2 }}
                    >
                      Creado por: {reto.creador_id}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                    <Button 
                      startIcon={<VisibilityIcon />}
                      variant="contained" 
                      size="large"
                      onClick={() => navigate(`/reto/verreto/${reto.id}`)}
                      fullWidth
                      sx={{
                        background: 'linear-gradient(45deg, #1B5E20 30%, #4CAF50 90%)',
                        boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)',
                      }}
                    >
                      Ver Reto
                    </Button>
                  </CardActions>
                </PublicacionCard>
              </motion.div>
            ))
          )}
        </PublicacionGrid>
      </motion.div>
    </HomeContainer>
  );
};

export default Home;