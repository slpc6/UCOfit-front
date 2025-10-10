import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Typography, 
  Button, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  Divider,
  Avatar,
  Box
} from '@mui/material';
import { motion } from 'framer-motion';
import { LoginContainer, LoginPaper } from '../Autenticacion/Login/style';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import BadgeIcon from '@mui/icons-material/Badge';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

import { Usuario } from '../../../types/usuario';
import { publicacionService } from '../../../services/publicacionService';
import { userService } from '../../../services/usuarioService';


const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [publicacionesCount, setPublicacionesCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userService.perfil();
        if (response.data) {
          setUserData(response.data.usuario);
        } else {
          setError(response.message || 'Error al cargar el perfil');
        }

        const publicaciones = await publicacionService.listarPublicacionesUsuario();
        setPublicacionesCount(publicaciones.length);
      } catch (err) {
        setError('Error al cargar el perfil');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    try {
      const response = await userService.eliminar();
      if (response.data) {
        localStorage.removeItem('token');
        navigate('/autenticacion/login');
      } else {
        setError(response.message || 'Error al eliminar la cuenta');
        setOpenDialog(false);
      }
    } catch (err) {
      setError('Error al eliminar la cuenta');
      setOpenDialog(false);
    } finally {
      setDeleteLoading(false);
    }
  };

  const getInitials = (nombre?: string, apellido?: string) => {
    if (!nombre || !apellido) return '?';
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
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
        style={{ width: '100%', maxWidth: '600px' }}
      >
        <LoginPaper elevation={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Avatar 
              sx={{ 
                width: 80, 
                height: 80, 
                bgcolor: 'primary.main',
                fontSize: '2rem',
                mr: 3
              }}
            >
              {userData && getInitials(userData.nombre, userData.apellido)}
            </Avatar>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                color: 'primary.main',
                fontWeight: 'bold',
              }}
            >
              Mi Perfil
            </Typography>
          </Box>

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
                {error}
              </Alert>
            </motion.div>
          )}

          {userData && (
            <>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <BadgeIcon fontSize="small" /> Nombre Completo
                </Typography>
                <Typography variant="h6">
                  {userData.nombre} {userData.apellido}
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <EmailIcon fontSize="small" /> Correo Electrónico
                </Typography>
                <Typography variant="h6">{userData.email}</Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <DescriptionIcon fontSize="small" /> Descripción
                </Typography>
                <Typography variant="body1">
                  {userData.descripcion || 'Sin descripción'}
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <VideoLibraryIcon fontSize="small" /> Publicaciones
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="h6">
                    {publicacionesCount}
                  </Typography>
                  <Button 
                    variant="outlined"
                    size="small"
                    onClick={() => navigate('/mis-publicaciones')}
                  >
                    Ver mis publicaciones
                  </Button>
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => setOpenDialog(true)}
                  fullWidth
                  sx={{ 
                    mt: 4,
                    py: 1.5,
                    borderRadius: '8px'
                  }}
                >
                  Eliminar Cuenta
                </Button>
              </motion.div>
            </>
          )}
        </LoginPaper>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>¿Estás seguro?</DialogTitle>
          <DialogContent>
            <Typography>
              Esta acción eliminará permanentemente tu cuenta y todos tus datos. Esta acción no se puede deshacer.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => setOpenDialog(false)}
              disabled={deleteLoading}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleDeleteAccount}
              color="error"
              variant="contained"
              disabled={deleteLoading}
            >
              {deleteLoading ? <CircularProgress size={24} /> : 'Eliminar Cuenta'}
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </LoginContainer>
  );
};

export default Profile;
