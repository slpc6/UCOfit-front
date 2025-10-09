// src/pages/Auth/Register/style.ts
import { styled } from '@mui/material/styles';
import { Container, Paper } from '@mui/material';

export const LoginContainer = styled(Container)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
}));

export const LoginPaper = styled(Paper)(() => ({
  padding: '2rem',
  borderRadius: '16px',
}));
