import { styled } from '@mui/material/styles';
import { AppBar, Button, Toolbar } from '@mui/material';

export const StyledAppBar = styled(AppBar)(({}) => ({
  background: 'linear-gradient(45deg, #1B5E20 30%, #4CAF50 90%)',
  boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)',
  width: '100%',
  //position: 'relative',
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  //maxWidth: '1600px',
  width: '100%',
  margin: '0 auto',
  padding: theme.spacing(1, 4),
  height: '80px', // Altura fija para el navbar
}));

export const LogoButton = styled(Button)(({ theme }) => ({
  padding: 0,
  minWidth: '100%',
  marginRight: theme.spacing(2),
  '& img': {
    width: '50px', // Logo más grande
    height: '50px',
    transition: 'transform 0.3s ease-in-out',
    [theme.breakpoints.up('md')]: {
      width: '60px', // Aún más grande en pantallas medianas
      height: '60px',
    },
  },
  '&:hover img': {
    transform: 'scale(1.1)',
  },
}));

export const NavButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  //borderRadius: '20px',
  //padding: '8px 24px', // Botones más grandes
  //fontSize: '1rem',
  color: 'inherit',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));