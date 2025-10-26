// src/pages/Auth/Register/Register.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Typography, Alert, Box, Card, Grid } from '@mui/material';
import { LoginContainer, LoginPaper } from './style';
import { userService } from '../../../../services/usuarioService';
import RegisterForm from './RegisterForm';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import StarIcon from '@mui/icons-material/Star';
import GroupIcon from '@mui/icons-material/Group';

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    descripcion: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await userService.registrar(formData);
      navigate('/login');
    } catch (err: unknown) {
      const errorMsg = (err as { response?: { data?: { msg?: string } } })?.response?.data?.msg || 'Error al registrar usuario';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: '1200px' }}
      >
        {/* Información sobre UCOfit */}
        <Box sx={{ mb: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card sx={{ mb: 3, p: 3, textAlign: 'center' }}>
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  mb: 2,
                  fontWeight: 'bold',
                  color: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2
                }}
              >
                <FitnessCenterIcon sx={{ fontSize: '2.5rem' }} />
                Únete a UCOfit
              </Typography>
              <Typography variant="h5" sx={{ mb: 2, color: 'text.secondary' }}>
                Comienza tu viaje de fitness hoy
              </Typography>
              <Typography variant="body1" sx={{ maxWidth: '600px', mx: 'auto' }}>
                Crea tu cuenta y forma parte de una comunidad activa de personas que comparten 
                tu pasión por el fitness. ¡Es gratis y solo toma unos minutos!
              </Typography>
            </Card>
          </motion.div>

          {/* Beneficios de registrarse */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card sx={{ textAlign: 'center', p: 2, height: '100%' }}>
                  <StarIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Gratis
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sin costos ocultos, únete completamente gratis
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card sx={{ textAlign: 'center', p: 2, height: '100%' }}>
                  <GroupIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Comunidad
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Conecta con personas con tus mismos objetivos
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card sx={{ textAlign: 'center', p: 2, height: '100%' }}>
                  <FitnessCenterIcon sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Progreso
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Documenta y comparte tu evolución
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Box>

        {/* Formulario de registro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <LoginPaper elevation={3}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                mb: 4,
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'primary.main'
              }}
            >
              Crear Cuenta
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 3,
                textAlign: 'center',
                color: 'text.secondary'
              }}
            >
              Completa el formulario para comenzar tu aventura en UCOfit
            </Typography>

            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Alert
                  severity="error"
                  sx={{ mb: 3 }}
                  onClose={() => setError('')}
                >
                  {error}
                </Alert>
              </motion.div>
            )}

            <RegisterForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              loading={loading}
            />

            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              ¿Ya tienes una cuenta?{' '}
              <motion.span
                whileHover={{ color: '#1B5E20' }}
                style={{ cursor: 'pointer', color: '#4CAF50' }}
                onClick={() => navigate('/login')}
              >
                Inicia sesión aquí
              </motion.span>
            </Typography>
          </LoginPaper>
        </motion.div>
      </motion.div>
    </LoginContainer>
  );
};

export default Register;
