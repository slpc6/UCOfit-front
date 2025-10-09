// src/components/pages/Login/styles.ts
import { styled, Paper, Box } from '@mui/material';

export const LoginContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #e8f5e9 0%, #a5d6a7 100%)',
  padding: theme.spacing(2)
}));

export const LoginPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: '100%',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[5]
}));
