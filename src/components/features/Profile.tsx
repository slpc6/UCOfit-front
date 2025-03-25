// Pagina de perfil del usuario

//External imports
import { useState } from 'react';
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
  Divider
} from '@mui/material';
import { motion } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import BadgeIcon from '@mui/icons-material/Badge';


//Internal imports
import { UserProfile } from '../../types/user';
import { ProfileContainer, ProfilePaper, ProfileField } from './styles/Profile.styles';
import { authService } from '../../services/authService';


export const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useState(() => {
    const fetchProfile = async () => {
      try {
        const response = await authService.getProfile();
        setUserData(response.usuario);
      } catch (err) {
        setError('Error al cargar el perfil');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  });

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

  if (loading) {
    return (
      <ProfileContainer sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            sx={{ 
              color: 'primary.main',
              fontWeight: 'bold',
              mb: 4,
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}
          >
            <PersonIcon fontSize="large" />
            Mi Perfil
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {userData && (
            <>
              <ProfileField>
                <Typography variant="subtitle2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <BadgeIcon /> Nombre Completo
                </Typography>
                <Typography variant="h6">
                  {userData.nombre} {userData.apellido}
                </Typography>
              </ProfileField>

              <Divider sx={{ my: 3 }} />

              <ProfileField>
                <Typography variant="subtitle2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon /> Correo Electrónico
                </Typography>
                <Typography variant="h6">{userData.email}</Typography>
              </ProfileField>

              <Divider sx={{ my: 3 }} />

              <ProfileField>
                <Typography variant="subtitle2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <DescriptionIcon /> Descripción
                </Typography>
                <Typography variant="body1">
                  {userData.descripcion || 'Sin descripción'}
                </Typography>
              </ProfileField>

              <Divider sx={{ my: 3 }} />

              <ProfileField>
                <Typography variant="subtitle2" color="textSecondary">
                  Rol
                </Typography>
                <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
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