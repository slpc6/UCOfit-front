// src/components/pages/Login/LoginForm.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  CircularProgress,
  InputAdornment,
  IconButton,
  Typography
} from '@mui/material';
import { motion } from 'framer-motion';
import { authService } from '../../../../services/authService';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface LoginFormProps {
  setError: (error: string) => void;
}

const LoginForm = ({ setError }: LoginFormProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await authService.login(credentials);
      localStorage.setItem('token', response.access_token);
      navigate('/home');
    } catch {
      setError('Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        type="email"
        value={credentials.email}
        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon color="primary" />
            </InputAdornment>
          )
        }}
        sx={{ mb: 3 }}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Contraseña"
        type={showPassword ? 'text' : 'password'}
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon color="primary" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
        sx={{ mb: 4 }}
      />

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{
            py: 1.5,
            fontSize: '1.1rem',
            borderRadius: '8px',
            background: 'linear-gradient(45deg, #1B5E20 30%, #4CAF50 90%)',
            boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)'
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Iniciar Sesión'}
        </Button>
      </motion.div>

      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        ¿No tienes una cuenta?{' '}
        <motion.span
          whileHover={{ color: '#1B5E20' }}
          style={{ cursor: 'pointer', color: '#4CAF50' }}
          onClick={() => navigate('/autenticacion/register')}
        >
          Regístrate aquí
        </motion.span>
      </Typography>
    </form>
  );
};

export default LoginForm;
