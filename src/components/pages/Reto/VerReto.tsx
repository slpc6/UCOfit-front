import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
  CircularProgress,
  Alert,
  Grid,
  TextField,
  InputAdornment,
  Divider
} from '@mui/material';
import { motion } from 'framer-motion';
import { LoginContainer, LoginPaper } from '../Autenticacion/Login/style';
import { retoService } from '../../../services/retoService';
import { publicacionService } from '../../../services/publicacionService';
import { Reto } from '../../../types/reto';
import { Publicacion } from '../../../types/publicacion';

const VerReto = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [reto, setReto] = useState<Reto | null>(null);
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [canCreatePublication, setCanCreatePublication] = useState(false);
  const [userHasPublication, setUserHasPublication] = useState(false);

  // Estados para el formulario de creación
  const [publicationData, setPublicationData] = useState({
    titulo: '',
    descripcion: '',
    video: null as File | null
  });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const fetchRetoData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        
        // Obtener datos del reto
        const retoResponse = await retoService.obtener(id);
        if (retoResponse.data) {
          setReto(retoResponse.data.reto);
        } else {
          setError(retoResponse.message || 'Error al cargar el reto');
          return;
        }

        // Obtener publicaciones del reto
        const publicacionesResponse = await publicacionService.listarPublicacionesReto(id);
        if (publicacionesResponse.data) {
          setPublicaciones(publicacionesResponse.data.publicaciones || []);
          
          // Verificar si el usuario ya tiene una publicación en este reto
          const userEmail = localStorage.getItem('userEmail');
          const userPublication = publicacionesResponse.data.publicaciones?.find(
            (pub: Publicacion) => pub.usuario_id === userEmail
          );
          
          setUserHasPublication(!!userPublication);
          setCanCreatePublication(!userPublication && !retoResponse.data?.is_expired);
        }

      } catch (err) {
        setError('Error al cargar los datos del reto');
      } finally {
        setLoading(false);
      }
    };

    fetchRetoData();
  }, [id]);

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPublicationData({ ...publicationData, video: file });
    }
  };

  const handleCreatePublication = async () => {
    if (!publicationData.video || !publicationData.titulo || !publicationData.descripcion) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (!id) return;

    setCreating(true);
    setError('');

    try {
      const response = await publicacionService.crear({
        titulo: publicationData.titulo,
        descripcion: publicationData.descripcion,
        video: publicationData.video,
        reto_id: id
      });

      if (response.data) {
        // Recargar las publicaciones
        const publicacionesResponse = await publicacionService.listarPublicacionesReto(id);
        if (publicacionesResponse.data) {
          setPublicaciones(publicacionesResponse.data.publicaciones || []);
        }
        
        setShowCreateForm(false);
        setCanCreatePublication(false);
        setUserHasPublication(true);
        setPublicationData({ titulo: '', descripcion: '', video: null });
      } else {
        setError(response.message || 'Error al crear la publicación');
      }
    } catch (err) {
      setError('Error al crear la publicación');
    } finally {
      setCreating(false);
    }
  };

  const getDiasRestantesColor = (dias: number) => {
    if (dias <= 3) return 'error';
    if (dias <= 7) return 'warning';
    return 'success';
  };

  if (loading) {
    return (
      <LoginContainer sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </LoginContainer>
    );
  }

  if (error && !reto) {
    return (
      <LoginContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', maxWidth: '600px' }}
        >
          <LoginPaper elevation={3}>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h4" sx={{ color: 'error.main', mb: 2 }}>
                ⚠️ Error
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {error}
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/home')}
                sx={{
                  borderRadius: '8px',
                  background: 'linear-gradient(45deg, #1B5E20 30%, #4CAF50 90%)',
                  boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)',
                }}
              >
                Volver a Retos
              </Button>
            </Box>
          </LoginPaper>
        </motion.div>
      </LoginContainer>
    );
  }

  if (!reto) return null;

  return (
    <LoginContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: '1200px' }}
      >
        <LoginPaper elevation={3}>
          {/* Header del Reto */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography 
                  variant="h4" 
                  component="h1" 
                  sx={{ 
                    color: 'primary.main',
                    fontWeight: 'bold',
                    mb: 1
                  }}
                >
                  🏆 {reto.titulo}
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'text.secondary',
                    mb: 2
                  }}
                >
                  {reto.descripcion}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Chip 
                  label={`${reto.dias_restantes} días restantes`}
                  color={getDiasRestantesColor(reto.dias_restantes)}
                  size="small"
                />
                <Button
                  variant="outlined"
                  onClick={() => navigate('/reto/listar')}
                  sx={{ borderRadius: '8px' }}
                >
                  Volver
                </Button>
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Información del Reto */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ textAlign: 'center', height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                      {publicaciones.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Publicaciones
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ textAlign: 'center', height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>
                      {new Set(publicaciones.map(p => p.usuario_id)).size}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Participantes
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
                {error}
              </Alert>
            </motion.div>
          )}

          {/* Botón para crear publicación */}
          {canCreatePublication && (
            <Box sx={{ mb: 3 }}>
              <Button
                variant="contained"
                onClick={() => setShowCreateForm(true)}
                sx={{
                  borderRadius: '8px',
                  background: 'linear-gradient(45deg, #1B5E20 30%, #4CAF50 90%)',
                  boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)',
                  py: 1.5,
                  px: 4
                }}
              >
                📹 Crear Mi Publicación
              </Button>
            </Box>
          )}

          {userHasPublication && (
            <Alert severity="success" sx={{ mb: 3 }}>
              ✅ Ya has participado en este reto con una publicación
            </Alert>
          )}

          {/* Formulario para crear publicación */}
          {showCreateForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Card sx={{ mb: 3, border: '2px solid', borderColor: 'primary.main' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                    📹 Crear Publicación para "{reto.titulo}"
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Título de la Publicación"
                        value={publicationData.titulo}
                        onChange={(e) => setPublicationData({ ...publicationData, titulo: e.target.value })}
                        required
                        helperText="Entre 5 y 30 caracteres"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              📝
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Descripción de la Publicación"
                        multiline
                        rows={3}
                        value={publicationData.descripcion}
                        onChange={(e) => setPublicationData({ ...publicationData, descripcion: e.target.value })}
                        required
                        helperText="Entre 10 y 100 caracteres"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              📝
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Button
                        variant="outlined"
                        component="label"
                        fullWidth
                        sx={{ py: 2 }}
                      >
                        {publicationData.video ? 'Cambiar Video' : 'Seleccionar Video'}
                        <input
                          type="file"
                          hidden
                          accept="video/*"
                          onChange={handleVideoChange}
                        />
                      </Button>
                      {publicationData.video && (
                        <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                          Video seleccionado: {publicationData.video.name}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
                
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    variant="outlined"
                    onClick={() => setShowCreateForm(false)}
                    sx={{ mr: 1 }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleCreatePublication}
                    disabled={creating || !publicationData.video || !publicationData.titulo || !publicationData.descripcion}
                    sx={{
                      borderRadius: '8px',
                      background: 'linear-gradient(45deg, #1B5E20 30%, #4CAF50 90%)',
                      boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)',
                    }}
                  >
                    {creating ? <CircularProgress size={24} color="inherit" /> : 'Crear Publicación'}
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          )}

          {/* Lista de Publicaciones */}
          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
              📹 Publicaciones del Reto
            </Typography>
            
            {publicaciones.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  No hay publicaciones aún
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ¡Sé el primero en participar en este reto!
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {publicaciones.map((publicacion, index) => (
                  <Grid item xs={12} sm={6} md={4} key={publicacion._id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {publicacion.titulo}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            sx={{ mb: 2 }}
                          >
                            {publicacion.descripcion}
                          </Typography>
                          <Chip 
                            label={`Por: ${publicacion.usuario_id}`}
                            color="primary"
                            variant="outlined"
                            size="small"
                          />
                        </CardContent>
                        
                        <CardActions sx={{ p: 2, pt: 0 }}>
                          <Button 
                            size="small" 
                            variant="outlined"
                            onClick={() => navigate(`/publicacion/${publicacion._id}`)}
                            sx={{ flexGrow: 1 }}
                          >
                            Ver Publicación
                          </Button>
                        </CardActions>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </LoginPaper>
      </motion.div>
    </LoginContainer>
  );
};

export default VerReto;
