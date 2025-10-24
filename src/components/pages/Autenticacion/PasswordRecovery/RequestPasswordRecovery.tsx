import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Box,
  InputAdornment
} from '@mui/material';
import { motion } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LoginContainer, LoginPaper } from '../Login/style';
import { passwordRecoveryService } from '../../../../services/passwordRecoveryService';

const RequestPasswordRecovery = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await passwordRecoveryService.requestRecovery({ email });
      
      if (response.data) {
        setSuccess(true);
      } else {
        setError(response.message || 'Error al enviar la solicitud');
      }
    } catch (err) {
      setError('Error al enviar la solicitud de recuperación');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/autenticacion/login');
  };

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
              Recuperar Contraseña
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                textAlign: 'center',
                mt: 2,
                color: 'text.secondary'
              }}
            >
              Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña
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
                  ¡Solicitud Enviada!
                </Typography>
                <Typography variant="body2">
                  Si el email existe en nuestro sistema, recibirás un enlace de recuperación en tu bandeja de entrada.
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, fontWeight: 'bold' }}>
                  Revisa también tu carpeta de spam.
                </Typography>
              </Alert>
            </motion.div>
          )}

          {!success && (
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                helperText="Ingresa el email asociado a tu cuenta"
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
                  disabled={loading || !email}
                  sx={{
                    py: 1.5,
                    fontSize: '1.1rem',
                    borderRadius: '8px',
                    background: 'linear-gradient(45deg, #1B5E20 30%, #4CAF50 90%)',
                    boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)',
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Enviar Enlace de Recuperación'}
                </Button>
              </motion.div>
            </form>
          )}

          {success && (
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button
                variant="outlined"
                onClick={handleBackToLogin}
                sx={{ borderRadius: '8px' }}
              >
                Volver al Login
              </Button>
            </Box>
          )}
        </LoginPaper>
      </motion.div>
    </LoginContainer>
  );
};

export default RequestPasswordRecovery;
