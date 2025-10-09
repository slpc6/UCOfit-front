// src/pages/Auth/Register/Register.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Typography, Alert} from '@mui/material';
import { LoginContainer, LoginPaper } from './style';
import { userService } from '../../../../services/usuarioService';
import RegisterForm from './RegisterForm';

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
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Error al registrar usuario');
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
        style={{ width: '100%', maxWidth: '500px' }}
      >
        <LoginPaper elevation={3}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              mb: 4,
              textAlign: 'center',
              fontWeight: 'bold',
              color: 'primary.main'
            }}
          >
            Registro
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
    </LoginContainer>
  );
};

export default Register;
