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
import { ProfileContainer, ProfilePaper, ProfileField } from './styles/Home.styles';
import { authService } from '../../services/authService';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import BadgeIcon from '@mui/icons-material/Badge';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { publicacionService } from '../../services/publicacionService';

interface UserProfile {
  nombre: string;
  apellido: string;
  email: string;
  descripcion: string;
  rol: string;
}

export const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [publicacionesCount, setPublicacionesCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener perfil del usuario
        const response = await authService.getProfile();
        setUserData(response.usuario);
        
        // Obtener conteo de publicaciones
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
      await authService.deleteAccount();
      localStorage.removeItem('token');
      navigate('/login');
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
      <ProfileContainer sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ProfilePaper elevation={3}>
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
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {userData && (
            <>
              <ProfileField>
                <Typography variant="subtitle2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <BadgeIcon fontSize="small" /> Nombre Completo
                </Typography>
                <Typography variant="h6">
                  {userData.nombre} {userData.apellido}
                </Typography>
              </ProfileField>

              <Divider sx={{ my: 3 }} />

              <ProfileField>
                <Typography variant="subtitle2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon fontSize="small" /> Correo Electrónico
                </Typography>
                <Typography variant="h6">{userData.email}</Typography>
              </ProfileField>

              <Divider sx={{ my: 3 }} />

              <ProfileField>
                <Typography variant="subtitle2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <DescriptionIcon fontSize="small" /> Descripción
                </Typography>
                <Typography variant="body1">
                  {userData.descripcion || 'Sin descripción'}
                </Typography>
              </ProfileField>

              <Divider sx={{ my: 3 }} />

              <ProfileField>
                <Typography variant="subtitle2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
              </ProfileField>

              <Divider sx={{ my: 3 }} />

              <ProfileField>
                <Typography variant="subtitle2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PersonIcon fontSize="small" /> Rol
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    bgcolor: userData.rol === 'administrador' ? 'secondary.main' : 'primary.main',
                    color: 'white',
                    px: 2,
                    py: 0.5,
                    borderRadius: 1
                  }}
                >
                  {userData.rol}
                </Typography>
              </ProfileField>

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
        </ProfilePaper>

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
    </ProfileContainer>
  );
};
