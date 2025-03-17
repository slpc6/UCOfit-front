import { styled } from '@mui/material/styles';
import { Paper, Box } from '@mui/material';

export const HomeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  minHeight: 'calc(100vh - 200px)', // Altura total menos el navbar y padding
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  textAlign: 'center',
  background: 'linear-gradient(45deg, #1B5E20 30%, #4CAF50 90%)',
  color: 'white',
  borderRadius: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(8),
  },
}));

export const ContentGrid = styled(Box)(({ theme }) => ({
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