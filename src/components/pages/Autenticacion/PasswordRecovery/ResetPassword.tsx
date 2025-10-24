import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Box,
  InputAdornment,
  IconButton
} from '@mui/material';
import { motion } from 'framer-motion';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LoginContainer, LoginPaper } from '../Login/style';
import { passwordRecoveryService } from '../../../../services/passwordRecoveryService';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validatingToken, setValidatingToken] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setError('Token de recuperación no encontrado');
        setValidatingToken(false);
        return;
      }

      try {
        const response = await passwordRecoveryService.validateToken(token);
        if (response.valid) {
          setTokenValid(true);
        } else {
          setError(response.msg || 'Token inválido o expirado');
        }
      } catch (err) {
        setError('Error al validar el token');
      } finally {
        setValidatingToken(false);
      }
    };

    validateToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validaciones del lado cliente
    if (!formData.newPassword.trim()) {
      setError('Por favor ingresa una nueva contraseña');
      setLoading(false);
      return;
    }

    if (formData.newPassword.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      setLoading(false);
      return;
    }

    if (formData.newPassword.length > 128) {
      setError('La contraseña no puede superar los 128 caracteres');
      setLoading(false);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    // Validar fortaleza de la contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.newPassword)) {
      setError('La contraseña debe contener al menos una letra minúscula, una mayúscula y un número');
      setLoading(false);
      return;
    }

    try {
      const response = await passwordRecoveryService.resetPassword({
        token: token!,
        new_password: formData.newPassword
      });
      
      if (response.data) {
        setSuccess(true);
        // Redirigir al login después de 3 segundos
        setTimeout(() => {
          navigate('/autenticacion/login');
        }, 3000);
      } else {
        setError(response.message || 'Error al actualizar la contraseña');
      }
    } catch (err) {
      setError('Error al actualizar la contraseña. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/autenticacion/login');
  };

  if (validatingToken) {
    return (
      <LoginContainer sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </LoginContainer>
    );
  }

  if (!tokenValid) {
    return (
      <LoginContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', maxWidth: '500px' }}
        >
          <LoginPaper elevation={3}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={handleBackToLogin}
                sx={{ mb: 2 }}
              >
                Volver al Login
              </Button>
              <Typography 
                variant="h4" 
                component="h1" 
                sx={{ 
                  color: 'error.main',
                  fontWeight: 'bold'
                }}
              >
                Token Inválido
              </Typography>
            </Box>

            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>

            <Box sx={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                onClick={handleBackToLogin}
                sx={{ borderRadius: '8px' }}
              >
                Volver al Login
              </Button>
            </Box>
          </LoginPaper>
        </motion.div>
      </LoginContainer>
    );
  }

  return (
    <LoginContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: '500px' }}
      >
        <LoginPaper elevation={3}>
          <Box sx={{ mb: 4 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={handleBackToLogin}
              sx={{ mb: 2 }}
            >
              Volver al Login
            </Button>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                color: 'primary.main',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              Nueva Contraseña
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                textAlign: 'center',
                mt: 2,
                color: 'text.secondary'
              }}
            >
              Ingresa tu nueva contraseña
            </Typography>
          </Box>

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
                {error}
              </Alert>
            </motion.div>
          )}

          {success && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Alert severity="success" sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  ¡Contraseña Actualizada!
                </Typography>
                <Typography variant="body2">
                  Tu contraseña ha sido actualizada exitosamente. Ya puedes iniciar sesión con tu nueva contraseña.
                </Typography>
              </Alert>
            </motion.div>
          )}

          {!success && (
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Nueva Contraseña"
                type={showPassword ? 'text' : 'password'}
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                required
                disabled={loading}
                helperText="Mínimo 8 caracteres"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                margin="normal"
                label="Confirmar Contraseña"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                disabled={loading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <motion.div 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                style={{ marginTop: '24px' }}
              >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading || !formData.newPassword || !formData.confirmPassword}
                  sx={{
                    py: 1.5,
                    fontSize: '1.1rem',
                    borderRadius: '8px',
                    background: 'linear-gradient(45deg, #1B5E20 30%, #4CAF50 90%)',
                    boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)',
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Actualizar Contraseña'}
                </Button>
              </motion.div>
            </form>
          )}

          {success && (
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button
                variant="contained"
                onClick={handleBackToLogin}
                sx={{ borderRadius: '8px' }}
              >
                Ir al Login
              </Button>
            </Box>
          )}
        </LoginPaper>
      </motion.div>
    </LoginContainer>
  );
};

export default ResetPassword;
