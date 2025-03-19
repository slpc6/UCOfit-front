import { useState } from 'react';
import { 
  Toolbar, 
  Typography, 
  Box,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ucoFitLogo from '../../assets/images/ucofit-logo.png';
import { StyledAppBar, LogoButton, NavButton, StyledToolbar } from './styles/Navbar.styles';
import AddIcon from '@mui/icons-material/Add';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

export const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const token = localStorage.getItem('token');
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navigateToHome = () => {
    if (token) {
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <LogoButton onClick={navigateToHome} color="inherit">
            <img src={ucoFitLogo} alt="UCOfit Logo" />
          </LogoButton>
        </motion.div>
        
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            fontWeight: 'bold',
            letterSpacing: '1px'
          }}
        >
          UCOfit
        </Typography>

        {isMobile ? (
          <IconButton 
            color="inherit"
            onClick={() => setIsOpen(!isOpen)}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {token ? (
              <>
                <NavButton onClick={() => navigate('/')}>
                  Inicio
                </NavButton>
                <NavButton onClick={() => navigate('/mis-publicaciones')}>
                  <VideoLibraryIcon sx={{ mr: 1 }} />
                  Mis Publicaciones
                </NavButton>
                <NavButton onClick={() => navigate('/crear-publicacion')}>
                  <AddIcon sx={{ mr: 1 }} />
                  Nueva Publicación
                </NavButton>
                <NavButton onClick={() => navigate('/profile')}>
                  Perfil
                </NavButton>
                <NavButton onClick={handleLogout}>
                  Cerrar Sesión
                </NavButton>
              </>
            ) : (
              <>
                <NavButton onClick={() => navigate('/login')}>
                  Iniciar Sesión
                </NavButton>
                <NavButton onClick={() => navigate('/register')}>
                  Registrarse
                </NavButton>
              </>
            )}
          </Box>
        )}
      </StyledToolbar>
    </StyledAppBar>
  );
};