import { styled } from '@mui/material/styles';
import { Paper, Box, Card } from '@mui/material';

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

export const PublicacionGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(4),
  marginTop: theme.spacing(4),
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
}));

export const PublicacionCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10],
  },
}));

export const ProfileContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '800px',
  margin: '0 auto',
  padding: theme.spacing(4),
}));

export const ProfilePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: theme.spacing(2),
  backgroundColor: '#fff',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(8),
  },
}));

export const ProfileField = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '&:last-child': {
    marginBottom: 0,
  },
}));