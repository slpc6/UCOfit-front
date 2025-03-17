import { styled } from '@mui/material/styles';
import { Paper, Box } from '@mui/material';

export const HomeContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1400px', // Ancho máximo para contenido
  margin: '0 auto',
  padding: theme.spacing(4),
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(8),
  textAlign: 'center',
  background: 'linear-gradient(45deg, #1B5E20 30%, #4CAF50 90%)',
  color: 'white',
  borderRadius: theme.spacing(2),
  marginBottom: theme.spacing(6),
}));

export const ContentGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(4),
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  '& .MuiCard-root': {
    height: '100%',
    minHeight: '250px', // Altura mínima para las tarjetas
  },
}));