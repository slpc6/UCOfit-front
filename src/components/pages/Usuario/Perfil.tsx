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
  Box,
  TextField,
  InputAdornment
} from '@mui/material';
import { motion } from 'framer-motion';
import { LoginContainer, LoginPaper } from '../Autenticacion/Login/style';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import BadgeIcon from '@mui/icons-material/Badge';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import EditIcon from '@mui/icons-material/Edit';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PhoneIcon from '@mui/icons-material/Phone';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

import { Usuario, UsuarioActualizar } from '../../../types/usuario';
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
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<UsuarioActualizar>({});
  const [updateLoading, setUpdateLoading] = useState(false);

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

  const handleEdit = () => {
    if (userData) {
      setEditData({
        nombre: userData.nombre,
        apellido: userData.apellido,
        email: userData.email,
        descripcion: userData.descripcion,
        ciudad: userData.ciudad,
        telefono: userData.telefono,
        foto_perfil: userData.foto_perfil
      });
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({});
    setError('');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'image/jpeg') {
        setError('Solo se permiten archivos JPG');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setEditData({ ...editData, foto_perfil: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    setUpdateLoading(true);
    setError('');
    
    try {
      const response = await userService.actualizar(editData);
      if (response.data) {
        const profileResponse = await userService.perfil();
        if (profileResponse.data) {
          setUserData(profileResponse.data.usuario);
        }
        setIsEditing(false);
        setEditData({});
      } else {
        setError(response.message || 'Error al actualizar el perfil');
      }
    } catch (err) {
      setError('Error al actualizar el perfil');
    } finally {
      setUpdateLoading(false);
    }
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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar 
                sx={{ 
                  width: 80, 
                  height: 80, 
                  bgcolor: 'primary.main',
                  fontSize: '2rem',
                  mr: 3
                }}
                src={userData?.foto_perfil}
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
            {!isEditing && (
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={handleEdit}
                sx={{ borderRadius: '8px' }}
              >
                Editar Perfil
              </Button>
            )}
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
              {isEditing ? (
                // Modo de edición
                <>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Nombre"
                    value={editData.nombre || ''}
                    onChange={(e) => setEditData({ ...editData, nombre: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BadgeIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    margin="normal"
                    label="Apellido"
                    value={editData.apellido || ''}
                    onChange={(e) => setEditData({ ...editData, apellido: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BadgeIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    type="email"
                    value={editData.email || ''}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    margin="normal"
                    label="Ciudad"
                    value={editData.ciudad || ''}
                    onChange={(e) => setEditData({ ...editData, ciudad: e.target.value })}
                    helperText="Entre 3 y 15 caracteres"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationCityIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    margin="normal"
                    label="Teléfono"
                    value={editData.telefono || ''}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setEditData({ ...editData, telefono: value });
                    }}
                    helperText="Entre 7 y 10 dígitos numéricos"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <div style={{ marginTop: '16px', marginBottom: '16px' }}>
                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<PhotoCameraIcon />}
                      fullWidth
                      sx={{ mb: 1 }}
                    >
                      {editData.foto_perfil ? 'Cambiar Foto de Perfil' : 'Subir Foto de Perfil'}
                      <input
                        type="file"
                        hidden
                        accept="image/jpeg"
                        onChange={handleImageUpload}
                      />
                    </Button>
                    {editData.foto_perfil && (
                      <div style={{ textAlign: 'center', marginTop: '8px' }}>
                        <img
                          src={editData.foto_perfil}
                          alt="Preview"
                          style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '8px' }}
                        />
                      </div>
                    )}
                    <div style={{ fontSize: '0.75rem', color: '#666', textAlign: 'center' }}>
                      Solo archivos JPG permitidos
                    </div>
                  </div>

                  <TextField
                    fullWidth
                    margin="normal"
                    label="Descripción"
                    multiline
                    rows={3}
                    value={editData.descripcion || ''}
                    onChange={(e) => setEditData({ ...editData, descripcion: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DescriptionIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                    <Button
                      variant="contained"
                      startIcon={<SaveIcon />}
                      onClick={handleUpdate}
                      disabled={updateLoading}
                      sx={{ flex: 1 }}
                    >
                      {updateLoading ? <CircularProgress size={24} /> : 'Guardar'}
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<CancelIcon />}
                      onClick={handleCancelEdit}
                      disabled={updateLoading}
                      sx={{ flex: 1 }}
                    >
                      Cancelar
                    </Button>
                  </Box>
                </>
              ) : (
                // Modo de visualización
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

                  {userData.ciudad && (
                    <>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <LocationCityIcon fontSize="small" /> Ciudad
                        </Typography>
                        <Typography variant="h6">{userData.ciudad}</Typography>
                      </Box>
                      <Divider sx={{ my: 3 }} />
                    </>
                  )}

                  {userData.telefono && (
                    <>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <PhoneIcon fontSize="small" /> Teléfono
                        </Typography>
                        <Typography variant="h6">{userData.telefono}</Typography>
                      </Box>
                      <Divider sx={{ my: 3 }} />
                    </>
                  )}

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
                        onClick={() => navigate('/publicacion/mispublicaciones')}
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
