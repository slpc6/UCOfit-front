import { useState } from 'react';
import {
  Typography, 
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HelpIcon from '@mui/icons-material/Help';
import CloseIcon from '@mui/icons-material/Close';
import ucoFitLogo from '../../assets/images/ucofit-logo.png';
import { StyledAppBar, LogoButton, NavButton, StyledToolbar } from './styles/Navbar.styles';
import AddIcon from '@mui/icons-material/Add';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

export const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const token = localStorage.getItem('token');
  const [isOpen, setIsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/autenticacion/login');
  };

  const navigateToHome = () => {
    if (token) {
      navigate('/home');
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
            {/* Botón de ayuda siempre visible */}
            <IconButton 
              color="inherit"
              onClick={() => setHelpOpen(true)}
              sx={{ mr: 1 }}
            >
              <HelpIcon />
            </IconButton>
            
            {token ? (
              <>
                <NavButton onClick={() => navigate('/ranking')}>
                  <LeaderboardIcon sx={{ mr: 1 }} />
                  Ranking
                </NavButton>
                <NavButton onClick={() => navigate('publicacion/mispublicaciones')}>
                  <VideoLibraryIcon sx={{ mr: 1 }} />
                  Mis Publicaciones
                </NavButton>
                <NavButton onClick={() => navigate('reto/crearreto')}>
                  <AddIcon sx={{ mr: 1 }} />
                  Crear Reto
                </NavButton>
                <NavButton onClick={() => navigate('/usuario/perfil')}>
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
       {/* Diálogo de ayuda */}
    <Dialog 
      open={helpOpen} 
      onClose={() => setHelpOpen(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          🆘 Centro de Ayuda - UCOfit
        </Typography>
        <IconButton onClick={() => setHelpOpen(false)}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
          ¿Cómo funciona UCOfit?
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
                  🎯 Crear Retos
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Los retos son objetivos de fitness que puedes crear y compartir con la comunidad:
                </Typography>
                <List dense>
                  <ListItem sx={{ py: 0 }}>
                    <ListItemText 
                      primary="• Establece un objetivo específico"
                      primaryTypographyProps={{ fontSize: '0.9rem' }}
                    />
                  </ListItem>
                  <ListItem sx={{ py: 0 }}>
                    <ListItemText 
                      primary="• Define una fecha de expiración"
                      primaryTypographyProps={{ fontSize: '0.9rem' }}
                    />
                  </ListItem>
                  <ListItem sx={{ py: 0 }}>
                    <ListItemText 
                      primary="• Invita a otros a participar"
                      primaryTypographyProps={{ fontSize: '0.9rem' }}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'secondary.main' }}>
                  📱 Subir Videos
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Documenta tu progreso con videos de ejercicios:
                </Typography>
                <List dense>
                  <ListItem sx={{ py: 0 }}>
                    <ListItemText 
                      primary="• Solo formato MP4"
                      primaryTypographyProps={{ fontSize: '0.9rem' }}
                    />
                  </ListItem>
                  <ListItem sx={{ py: 0 }}>
                    <ListItemText 
                      primary="• Videos claros y bien iluminados"
                      primaryTypographyProps={{ fontSize: '0.9rem' }}
                    />
                  </ListItem>
                  <ListItem sx={{ py: 0 }}>
                    <ListItemText 
                      primary="• Títulos y descripciones descriptivos"
                      primaryTypographyProps={{ fontSize: '0.9rem' }}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'success.main' }}>
                  🏆 Sistema de Puntuación
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  La comunidad evalúa tus publicaciones:
                </Typography>
                <List dense>
                  <ListItem sx={{ py: 0 }}>
                    <ListItemText 
                      primary="• Puntuación de 1 a 5 estrellas"
                      primaryTypographyProps={{ fontSize: '0.9rem' }}
                    />
                  </ListItem>
                  <ListItem sx={{ py: 0 }}>
                    <ListItemText 
                      primary="• Suma total determina tu ranking"
                      primaryTypographyProps={{ fontSize: '0.9rem' }}
                    />
                  </ListItem>
                  <ListItem sx={{ py: 0 }}>
                    <ListItemText 
                      primary="• Comenta y puntúa otras publicaciones"
                      primaryTypographyProps={{ fontSize: '0.9rem' }}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'warning.main' }}>
                  📊 Ranking y Progreso
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Ve tu evolución y compite sanamente:
                </Typography>
                <List dense>
                  <ListItem sx={{ py: 0 }}>
                    <ListItemText 
                      primary="• Posición en el ranking general"
                      primaryTypographyProps={{ fontSize: '0.9rem' }}
                    />
                  </ListItem>
                  <ListItem sx={{ py: 0 }}>
                    <ListItemText 
                      primary="• Estadísticas en tu dashboard"
                      primaryTypographyProps={{ fontSize: '0.9rem' }}
                    />
                  </ListItem>
                  <ListItem sx={{ py: 0 }}>
                    <ListItemText 
                      primary="• Progreso visible en el tiempo"
                      primaryTypographyProps={{ fontSize: '0.9rem' }}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />
        
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          💡 Consejos para tener éxito
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>• Consistencia:</strong> Publica regularmente para mantener tu ranking
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>• Calidad:</strong> Videos claros reciben mejores puntuaciones
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>• Interacción:</strong> Comenta y puntúa otras publicaciones
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>• Diversidad:</strong> Participa en diferentes tipos de retos
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>• Motivación:</strong> Usa la comunidad para mantenerte motivado
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>• Seguridad:</strong> Siempre consulta con profesionales de la salud
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={() => setHelpOpen(false)} variant="contained">
          Entendido
        </Button>
      </DialogActions>
    </Dialog>
    </StyledAppBar>

   
  );
};