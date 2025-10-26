import { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  CircularProgress,
  Alert,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { motion } from 'framer-motion';
import { LoginContainer, LoginPaper } from '../pages/Autenticacion/Login/style';
import { rankingService } from '../../services/rankingService';

const Dashboard = () => {
  const [stats, setStats] = useState<{
    nombre: string;
    apellido: string;
    email: string;
    ciudad?: string;
    foto_perfil?: string;
    puntuacion_total: number;
    posicion: number;
    total_publicaciones: number;
    promedio_puntuacion: number;
    publicaciones_con_puntuacion: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await rankingService.obtenerMiPuntuacion();
        
        if (response.data) {
          setStats(response.data.usuario);
        } else {
          setError(response.message || 'Error al cargar las estadísticas');
        }
      } catch (err) {
        setError(`Error al cargar las estadísticas. ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const getInitials = (nombre: string, apellido: string) => {
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
  };

  const getPositionColor = (posicion: number) => {
    if (posicion === 1) return '#FFD700'; // Oro
    if (posicion === 2) return '#C0C0C0'; // Plata
    if (posicion === 3) return '#CD7F32'; // Bronce
    return 'primary.main';
  };

  if (loading) {
    return (
      <LoginContainer sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </LoginContainer>
    );
  }

  return (
    <LoginContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: '1200px' }}
      >
        <LoginPaper elevation={3}>
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                color: 'primary.main',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              📊 Mi Dashboard
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                textAlign: 'center',
                mt: 2,
                color: 'text.secondary'
              }}
            >
              Resumen de tu actividad y rendimiento
            </Typography>
          </Box>

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
                {error}
              </Alert>
            </motion.div>
          )}

          {stats && (
            <>
              {/* Información del usuario */}
              <Card sx={{ mb: 4 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Avatar 
                      src={stats.foto_perfil}
                      sx={{ 
                        width: 80, 
                        height: 80,
                        bgcolor: 'primary.main',
                        fontSize: '2rem'
                      }}
                    >
                      {getInitials(stats.nombre, stats.apellido)}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        {stats.nombre} {stats.apellido}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {stats.email}
                      </Typography>
                      {stats.ciudad && (
                        <Typography variant="body2" color="text.secondary">
                          📍 {stats.ciudad}
                        </Typography>
                      )}
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Chip
                        label={`#${stats.posicion}`}
                        sx={{
                          backgroundColor: getPositionColor(stats.posicion),
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '1.2rem',
                          mb: 1
                        }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        Posición en Ranking
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              {/* Estadísticas principales */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Card sx={{ textAlign: 'center', height: '100%' }}>
                      <CardContent>
                        <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                          {stats.puntuacion_total}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                          Puntuación Total
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Suma de todas tus puntuaciones
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Card sx={{ textAlign: 'center', height: '100%' }}>
                      <CardContent>
                        <Typography variant="h3" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>
                          {stats.total_publicaciones}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                          Total Publicaciones
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Videos compartidos
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Card sx={{ textAlign: 'center', height: '100%' }}>
                      <CardContent>
                        <Typography variant="h3" sx={{ color: 'success.main', fontWeight: 'bold' }}>
                          {stats.promedio_puntuacion.toFixed(1)}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                          Promedio
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Puntuación promedio por publicación
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Card sx={{ textAlign: 'center', height: '100%' }}>
                      <CardContent>
                        <Typography variant="h3" sx={{ color: 'warning.main', fontWeight: 'bold' }}>
                          {stats.posicion}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                          Ranking
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Tu posición actual
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              </Grid>

              {/* Progreso visual */}
              <Card sx={{ mb: 4 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                    📈 Tu Progreso
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Puntuación Total</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {stats.puntuacion_total} pts
                      </Typography>
                    </Box>
                    <Box sx={{ 
                      width: '100%', 
                      height: 8, 
                      backgroundColor: 'grey.300', 
                      borderRadius: 4,
                      overflow: 'hidden'
                    }}>
                      <Box sx={{ 
                        width: `${Math.min(100, (stats.puntuacion_total / 100) * 100)}%`, 
                        height: '100%', 
                        backgroundColor: 'primary.main',
                        transition: 'width 0.5s ease'
                      }} />
                    </Box>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Promedio de Puntuación</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {stats.promedio_puntuacion.toFixed(1)} ⭐
                      </Typography>
                    </Box>
                    <Box sx={{ 
                      width: '100%', 
                      height: 8, 
                      backgroundColor: 'grey.300', 
                      borderRadius: 4,
                      overflow: 'hidden'
                    }}>
                      <Box sx={{ 
                        width: `${Math.min(100, (stats.promedio_puntuacion / 5) * 100)}%`, 
                        height: '100%', 
                        backgroundColor: 'secondary.main',
                        transition: 'width 0.5s ease'
                      }} />
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              {/* Consejos y motivación */}
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                    💡 Consejos para Mejorar
                  </Typography>
                  
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Mantén la consistencia"
                        secondary="Publica regularmente para mantener tu ranking"
                      />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText
                        primary="Interactúa con la comunidad"
                        secondary="Comenta y puntúa las publicaciones de otros usuarios"
                      />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText
                        primary="Únete a más retos"
                        secondary="Participa en diferentes categorías para diversificar tu contenido"
                      />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText
                        primary="Mejora la calidad"
                        secondary="Enfócate en crear contenido de alta calidad que inspire a otros"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </>
          )}
        </LoginPaper>
      </motion.div>
    </LoginContainer>
  );
};

export default Dashboard;
