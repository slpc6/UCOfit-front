import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Box,
  InputAdornment,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { motion } from 'framer-motion';
import { LoginContainer, LoginPaper } from '../Autenticacion/Login/style';
import { retoService } from '../../../services/retoService';
import { RetoConPublicacion } from '../../../types/reto';

const CrearReto = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [retoData, setRetoData] = useState({
    titulo_reto: '',
    descripcion_reto: '',
    titulo_publicacion: '',
    descripcion_publicacion: '',
    video: null as File | null
  });


  const steps = ['Información del Reto', 'Publicación Inicial'];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setRetoData({ ...retoData, video: file });
    }
  };

  const handleSubmit = async () => {
    if (!retoData.video) {
      setError('Debes seleccionar un video para la publicación inicial');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const retoConPublicacion: RetoConPublicacion = {
        titulo_reto: retoData.titulo_reto,
        descripcion_reto: retoData.descripcion_reto,
        titulo_publicacion: retoData.titulo_publicacion,
        descripcion_publicacion: retoData.descripcion_publicacion,
        video: retoData.video
      };

      const response = await retoService.crearConPublicacion(retoConPublicacion);
      
      if (response.data) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      } else {
        setError(response.message || 'Error al crear el reto');
      }
    } catch (err) {
      setError('Error al crear el reto');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 3 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Título del Reto"
              value={retoData.titulo_reto}
              onChange={(e) => setRetoData({ ...retoData, titulo_reto: e.target.value })}
              required
              helperText="Entre 5 y 50 caracteres"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    🏆
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Descripción del Reto"
              multiline
              rows={4}
              value={retoData.descripcion_reto}
              onChange={(e) => setRetoData({ ...retoData, descripcion_reto: e.target.value })}
              required
              helperText="Entre 10 y 200 caracteres"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    📝
                  </InputAdornment>
                ),
              }}
            />

          </Box>
        );

      case 1:
        return (
          <Box sx={{ mt: 3 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Título de la Publicación"
              value={retoData.titulo_publicacion}
              onChange={(e) => setRetoData({ ...retoData, titulo_publicacion: e.target.value })}
              required
              helperText="Entre 5 y 30 caracteres"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    📹
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Descripción de la Publicación"
              multiline
              rows={3}
              value={retoData.descripcion_publicacion}
              onChange={(e) => setRetoData({ ...retoData, descripcion_publicacion: e.target.value })}
              required
              helperText="Entre 10 y 100 caracteres"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    📝
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ mt: 3 }}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ py: 2 }}
              >
                {retoData.video ? 'Cambiar Video' : 'Seleccionar Video'}
                <input
                  type="file"
                  hidden
                  accept="video/*"
                  onChange={handleVideoChange}
                />
              </Button>
              {retoData.video && (
                <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                  Video seleccionado: {retoData.video.name}
                </Typography>
              )}
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 0:
        return retoData.titulo_reto.length >= 5 && retoData.descripcion_reto.length >= 10;
      case 1:
        return retoData.titulo_publicacion.length >= 5 && 
               retoData.descripcion_publicacion.length >= 10 && 
               retoData.video !== null;
      default:
        return false;
    }
  };

  if (success) {
    return (
      <LoginContainer>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', maxWidth: '500px' }}
        >
          <LoginPaper elevation={3}>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h4" sx={{ color: 'success.main', mb: 2 }}>
                🎉 ¡Reto Creado!
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Tu reto y publicación inicial han sido creados exitosamente.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Redirigiendo al inicio...
              </Typography>
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
        style={{ width: '100%', maxWidth: '800px' }}
      >
        <LoginPaper elevation={3}>
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                color: 'primary.main',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              🏆 Crear Nuevo Reto
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                textAlign: 'center',
                mt: 2,
                color: 'text.secondary'
              }}
            >
              Crea un reto y comparte tu primera publicación
            </Typography>
          </Box>

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
                {error}
              </Alert>
            </motion.div>
          )}

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {renderStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Atrás
            </Button>
            
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading || !isStepValid(activeStep)}
                sx={{
                  py: 1.5,
                  px: 4,
                  borderRadius: '8px',
                  background: 'linear-gradient(45deg, #1B5E20 30%, #4CAF50 90%)',
                  boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)',
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Crear Reto'}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!isStepValid(activeStep)}
                sx={{
                  py: 1.5,
                  px: 4,
                  borderRadius: '8px',
                  background: 'linear-gradient(45deg, #1B5E20 30%, #4CAF50 90%)',
                  boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)',
                }}
              >
                Siguiente
              </Button>
            )}
          </Box>
        </LoginPaper>
      </motion.div>
    </LoginContainer>
  );
};

export default CrearReto;
