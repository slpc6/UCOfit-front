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
  Box
} from '@mui/material';
import { motion } from 'framer-motion';
import { HomeContainer } from '../styles/Home.styles';


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
      await publicacionService.crearPublicacion(form);
      navigate('/mis-publicaciones');
    } catch (err) {
      console.error(err);
      setError('Error al crear la publicación');
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
            
            <input
              type="file"
              accept="video/mp4"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setForm({ ...form, video: file });
              }}
              className="border border-gray-300 rounded-md p-2"
              ref={fileInputRef }
            />

            
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
