// src/components/pages/Publicacion/EditarPublicacion.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useEditarPublicacion } from './hooks/useEditarPublicacion';
import { Publicacion } from '../../../types/publicacion';

interface EditarPublicacionProps {
  open: boolean;
  onClose: () => void;
  publicacion: Publicacion | null;
  onSuccess: () => void;
  setError: (msg: string) => void;
}

const EditarPublicacion = ({ 
  open, 
  onClose, 
  publicacion, 
  onSuccess, 
  setError 
}: EditarPublicacionProps) => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: ''
  });
  const [error, setLocalError] = useState('');
  
  const { loading, editarPublicacion } = useEditarPublicacion(setError);

  // Actualizar formData cuando cambie la publicación
  useEffect(() => {
    if (publicacion) {
      setFormData({
        titulo: publicacion.titulo || '',
        descripcion: publicacion.descripcion || ''
      });
    }
  }, [publicacion]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    
    if (!publicacion?._id) return;
    
    try {
      await editarPublicacion(publicacion._id, formData);
      onSuccess();
      onClose();
    } catch (err) {
      // El error ya se maneja en el hook
    }
  };

  const handleClose = () => {
    setLocalError('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Editar Publicación</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setLocalError('')}>
              {error}
            </Alert>
          )}
          
          <TextField
            fullWidth
            label="Título"
            value={formData.titulo}
            onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
            margin="normal"
            required
            disabled={loading}
          />
          
          <TextField
            fullWidth
            label="Descripción"
            multiline
            rows={4}
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            margin="normal"
            required
            disabled={loading}
          />
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancelar
          </Button>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading || !formData.titulo.trim() || !formData.descripcion.trim()}
              sx={{
                background: 'linear-gradient(45deg, #1B5E20 30%, #4CAF50 90%)',
                boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)',
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Guardar Cambios'}
            </Button>
          </motion.div>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditarPublicacion;
