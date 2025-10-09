// src/components/pages/Login/Login.tsx
import { motion } from 'framer-motion';
import { Typography, Alert } from '@mui/material';
import { useState } from 'react';
import { LoginContainer, LoginPaper } from './style';
import LoginForm from './LoginForm';

const Login = () => {
  const [error, setError] = useState('');

  return (
    <LoginContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: '600px' }}
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
            Iniciar Sesión
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
    </LoginContainer>
  );
};

export default Login;
