import { styled } from '@mui/material/styles';
import { Paper, Box } from '@mui/material';

export const LoginContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  minHeight: 'calc(100vh - 100px)', // Ajusta según la altura del navbar
  padding: theme.spacing(3),
}));

export const LoginPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  width: '100%',
  maxWidth: '600px', // Más ancho para pantallas de escritorio
  borderRadius: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(8),
  },
}));