// src/components/pages/Login/Login.tsx
import { motion } from 'framer-motion';
import { Typography, Alert, Box, Card, Grid } from '@mui/material';
import { useState } from 'react';
import { LoginContainer, LoginPaper } from './style';
import LoginForm from './LoginForm';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupIcon from '@mui/icons-material/Group';

const Login = () => {
  const [error, setError] = useState('');

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
                UCOfit
              </Typography>
              <Typography variant="h5" sx={{ mb: 2, color: 'text.secondary' }}>
                Tu plataforma de fitness colaborativa
              </Typography>
              <Typography variant="body1" sx={{ maxWidth: '600px', mx: 'auto' }}>
                Únete a una comunidad activa donde puedes crear retos, compartir tu progreso 
                y competir de manera sana con otros usuarios. ¡Motívate y alcanza tus metas de fitness!
              </Typography>
            </Card>
          </motion.div>

          {/* Características principales */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card sx={{ textAlign: 'center', p: 2, height: '100%' }}>
                  <EmojiEventsIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Compite
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Participa en rankings y demuestra tu progreso
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
                  <FitnessCenterIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Entrena
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Crea retos y documenta tu progreso con videos
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
                  <GroupIcon sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Conecta
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Interactúa con la comunidad y recibe motivación
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Box>

        {/* Formulario de login */}
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
              Iniciar Sesión
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 3,
                textAlign: 'center',
                color: 'text.secondary'
              }}
            >
              Ingresa tus credenciales para acceder a tu cuenta
            </Typography>

            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
                  {error}
                </Alert>
              </motion.div>
            )}

            <LoginForm setError={setError} />
          </LoginPaper>
        </motion.div>
      </motion.div>
    </LoginContainer>
  );
};

export default Login;
