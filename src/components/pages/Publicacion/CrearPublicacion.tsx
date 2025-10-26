// Pagina donde el usuario puede crear una publicacion

//External imports
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Typography, 
  TextField, 
  Button, 
  CircularProgress,
  Alert,
  Paper,
  Box,
  Card,
  CardContent,
  Tooltip,
  IconButton
} from '@mui/material';
import { motion } from 'framer-motion';
import { HomeContainer } from '../styles/Home.styles';
import InfoIcon from '@mui/icons-material/Info';
import VideoFileIcon from '@mui/icons-material/VideoFile';


//Internal imports
import { publicacionService } from '../../../services/publicacionService';
import { Publicacion } from '../../../types/publicacion';


const CrearPublicacion = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<Publicacion>({
    titulo: '',
    descripcion: '',
    video: '',
    usuario_id: '',
    comentarios: [],
    puntuaciones: [],
    puntuacion_promedio: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const publicacionData = {
        titulo: form.titulo,
        descripcion: form.descripcion,
      };
      await publicacionService.crear(publicacionData, fileInputRef.current?.files?.[0] || null);
      navigate('/mis-publicaciones');
    } catch (err) {
      setError(`Error al crear la publicación. ${err}`);
    } finally {
      setLoading(false);
    }
  };


  return (
    <HomeContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}
      >
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: 'bold' }}>
            Crear Nueva Publicación
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
            Comparte tu progreso de fitness con la comunidad. Sube un video de tu ejercicio 
            y describe tu experiencia para motivar a otros usuarios.
          </Typography>

          {/* Información útil */}
          <Card sx={{ mb: 4, bgcolor: 'primary.50' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <InfoIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  Consejos para una buena publicación
                </Typography>
              </Box>
              <Box component="ul" sx={{ pl: 2, m: 0 }}>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  <strong>Título descriptivo:</strong> Usa un título claro que describa tu ejercicio
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  <strong>Video de calidad:</strong> Asegúrate de que el video esté bien iluminado y sea claro
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  <strong>Descripción detallada:</strong> Explica tu rutina, dificultad y consejos
                </Typography>
                <Typography component="li" variant="body2">
                  <strong>Formato:</strong> Solo se aceptan videos en formato MP4
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Título de la publicación
                </Typography>
                <Tooltip title="Escribe un título descriptivo que explique qué ejercicio realizaste. Ejemplo: 'Sentadillas con salto - 30 repeticiones'">
                  <IconButton size="small">
                    <InfoIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <TextField
                label="Título"
                fullWidth
                margin="normal"
                required
                value={form.titulo}
                onChange={(e) => setForm({...form, titulo: e.target.value})}
                placeholder="Ej: Sentadillas con salto - 30 repeticiones"
                helperText="Mínimo 5 caracteres, máximo 30 caracteres"
              />
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Descripción
                </Typography>
                <Tooltip title="Describe tu rutina, la dificultad, consejos o cualquier información que pueda ayudar a otros usuarios">
                  <IconButton size="small">
                    <InfoIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <TextField
                label="Descripción"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                required
                value={form.descripcion}
                onChange={(e) => setForm({...form, descripcion: e.target.value})}
                placeholder="Describe tu ejercicio, rutina, dificultad y cualquier consejo útil..."
                helperText="Mínimo 10 caracteres, máximo 100 caracteres"
              />
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <VideoFileIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Video del ejercicio
                </Typography>
                <Tooltip title="Sube un video de tu ejercicio. Asegúrate de que esté bien iluminado y sea claro. Solo se aceptan archivos MP4">
                  <IconButton size="small">
                    <InfoIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <input
                type="file"
                accept="video/mp4"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setForm({ ...form, video: file });
                }}
                className="border border-gray-300 rounded-md p-2"
                ref={fileInputRef}
                style={{ width: '100%', padding: '12px', border: '2px dashed #ccc', borderRadius: '8px' }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Formatos aceptados: MP4 | Tamaño máximo recomendado: 100MB
              </Typography>
            </Box>

            
            <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/mis-publicaciones')}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading || !form.titulo || !form.descripcion || !form.video}
              >
                {loading ? <CircularProgress size={24} /> : 'Crear Publicación'}
              </Button>
            </Box>
          </form>
        </Paper>
      </motion.div>
    </HomeContainer>
  );
};

export default CrearPublicacion;
