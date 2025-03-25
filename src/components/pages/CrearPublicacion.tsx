// Pagina donde el usuario puede crear una publicacion

//External imports
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Typography, 
  TextField, 
  Button, 
  CircularProgress,
  Alert,
  Paper,
  Box
} from '@mui/material';
import { motion } from 'framer-motion';
import { HomeContainer } from './styles/Home.styles';


//Internal imports
import { publicacionService } from '../../services/publicacionService';


export const CrearPublicacion = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    video: '',
    usuario_id: '',
    comentarios: [],
    puntuacion: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await publicacionService.crearPublicacion(form);
      navigate('/mis-publicaciones');
    } catch (err) {
      console.error(err);
      setError('Error al crear la publicación');
    } finally {
      setLoading(false);
    }
  };

  const handleVideoInput = (url: string) => {
    setForm({...form, video: url});
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1].split('&')[0];
      setVideoPreview(`https://www.youtube.com/embed/${videoId}`);
    } else if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1];
      setVideoPreview(`https://www.youtube.com/embed/${videoId}`);
    } else {
      setVideoPreview(null);
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
          <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
            Crear Nueva Publicación
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Título"
              fullWidth
              margin="normal"
              required
              value={form.titulo}
              onChange={(e) => setForm({...form, titulo: e.target.value})}
            />
            
            <TextField
              label="Descripción"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              required
              value={form.descripcion}
              onChange={(e) => setForm({...form, descripcion: e.target.value})}
            />
            
            <TextField
              label="URL del Video"
              fullWidth
              margin="normal"
              required
              value={form.video}
              onChange={(e) => handleVideoInput(e.target.value)}
              helperText="Ingresa la URL de YouTube para el video"
            />

            {videoPreview && (
              <Box sx={{ mt: 3, mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Vista Previa:
                </Typography>
                <iframe
                  width="100%"
                  height="315"
                  src={videoPreview}
                  title="Vista previa del video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Box>
            )}
            
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
