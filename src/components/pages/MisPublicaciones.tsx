import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Typography, 
  Button, 
  CircularProgress,
  Alert,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Box,
  TextField
} from '@mui/material';
import { motion } from 'framer-motion';
import { HomeContainer, PublicacionCard } from './styles/Home.styles';
import { publicacionService, Publicacion } from '../../services/publicacionService';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

export const MisPublicaciones = () => {
  const navigate = useNavigate();
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    titulo: '',
    descripcion: '',
    video: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const data = await publicacionService.listarPublicacionesUsuario();
        setPublicaciones(data);
      } catch (err) {
        setError('Error al cargar tus publicaciones');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicaciones();
  }, []);

  const handleDelete = async (id: string) => {
    setSubmitting(true);
    try {
      await publicacionService.eliminarPublicacion(id);
      setPublicaciones(publicaciones.filter(p => p._id !== id));
      setDeleteDialogOpen(null);
    } catch (err) {
      console.error(err);
      setError('Error al eliminar la publicación');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async () => {
    if (!editDialogOpen) return;
    
    setSubmitting(true);
    try {
      await publicacionService.editarPublicacion(editDialogOpen, editForm);
      // Actualizar la publicación en el estado local
      setPublicaciones(publicaciones.map(p => 
        p._id === editDialogOpen ? { ...p, ...editForm } : p
      ));
      setEditDialogOpen(null);
    } catch (err) {
      console.error(err);
      setError('Error al editar la publicación');
    } finally {
      setSubmitting(false);
    }
  };

  const openEditDialog = (publicacion: Publicacion) => {
    setEditForm({
      titulo: publicacion.titulo,
      descripcion: publicacion.descripcion,
      video: publicacion.video
    });
    setEditDialogOpen(publicacion._id || null);
  };

  const getVideoEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1];
      return `https://www.youtube.com/embed/${videoId}`;
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            Mis Publicaciones
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={() => navigate('/crear-publicacion')}
          >
            Nueva Publicación
          </Button>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        {publicaciones.length === 0 ? (
          <Card sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              No tienes publicaciones aún
            </Typography>
            <Button 
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/crear-publicacion')}
            >
              Crear tu primera publicación
            </Button>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {publicaciones.map((publicacion, index) => (
              <Grid item xs={12} md={6} lg={4} key={publicacion._id}>
                <motion.div
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
                    </CardContent>
                    <CardActions sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                      <Button 
                        startIcon={<EditIcon />}
                        variant="outlined" 
                        size="small"
                        onClick={() => openEditDialog(publicacion)}
                      >
                        Editar
                      </Button>
                      <Button 
                        startIcon={<DeleteIcon />}
                        variant="outlined"
                        color="error" 
                        size="small"
                        onClick={() => setDeleteDialogOpen(publicacion._id || null)}
                      >
                        Eliminar
                      </Button>
                    </CardActions>
                  </PublicacionCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Diálogo de confirmación de eliminación */}
        <Dialog 
          open={!!deleteDialogOpen} 
          onClose={() => setDeleteDialogOpen(null)}
        >
          <DialogTitle>¿Eliminar publicación?</DialogTitle>
          <DialogContent>
            <Typography>
              Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar esta publicación?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(null)} disabled={submitting}>
              Cancelar
            </Button>
            <Button 
              onClick={() => deleteDialogOpen && handleDelete(deleteDialogOpen)}
              color="error"
              variant="contained"
              disabled={submitting}
            >
              {submitting ? <CircularProgress size={24} /> : 'Eliminar'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Diálogo de edición */}
        <Dialog 
          open={!!editDialogOpen} 
          onClose={() => setEditDialogOpen(null)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Editar Publicación</DialogTitle>
          <DialogContent>
            <TextField
              label="Título"
              fullWidth
              margin="normal"
              value={editForm.titulo}
              onChange={(e) => setEditForm({...editForm, titulo: e.target.value})}
            />
            <TextField
              label="Descripción"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              value={editForm.descripcion}
              onChange={(e) => setEditForm({...editForm, descripcion: e.target.value})}
            />
            <TextField
              label="URL del Video"
              fullWidth
              margin="normal"
              value={editForm.video}
              onChange={(e) => setEditForm({...editForm, video: e.target.value})}
              helperText="Ingresa la URL de YouTube para el video"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(null)} disabled={submitting}>
              Cancelar
            </Button>
            <Button 
              onClick={handleEdit}
              color="primary"
              variant="contained"
              disabled={submitting}
            >
              {submitting ? <CircularProgress size={24} /> : 'Guardar Cambios'}
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </HomeContainer>
  );
};
