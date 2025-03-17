import { Typography, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { HomeContainer, StyledPaper, ContentGrid } from './styles/Home.styles';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import RestaurantIcon from '@mui/icons-material/Restaurant';

export const Home = () => {
  const features = [
    {
      icon: <FitnessCenterIcon sx={{ fontSize: 40 }} />,
      title: 'Rutinas Personalizadas',
      description: 'Entrena con programas diseñados específicamente para ti'
    },
    {
      icon: <DirectionsRunIcon sx={{ fontSize: 40 }} />,
      title: 'Seguimiento de Progreso',
      description: 'Monitorea tu evolución y alcanza tus objetivos'
    },
    {
      icon: <RestaurantIcon sx={{ fontSize: 40 }} />,
      title: 'Plan Nutricional',
      description: 'Recibe recomendaciones nutricionales personalizadas'
    }
  ];

  return (
    <HomeContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <StyledPaper elevation={3}>
          <Typography 
            variant="h2" 
            component="h1"
            sx={{
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
              fontSize: { xs: '2.5rem', md: '3.75rem' }
            }}
          >
            Bienvenido a UCOfit
          </Typography>
          <Typography 
            variant="h5"
            sx={{ 
              mt: 2, 
              opacity: 0.9,
              fontSize: { xs: '1.2rem', md: '1.5rem' }
            }}
          >
            Tu compañero perfecto para mantenerte en forma
          </Typography>
        </StyledPaper>

        <ContentGrid>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card 
                elevation={3}
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 3,
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    transition: 'transform 0.3s ease-in-out'
                  }
                }}
              >
                {feature.icon}
                <CardContent>
                  <Typography 
                    variant="h5" 
                    component="h2" 
                    gutterBottom
                    align="center"
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    align="center"
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </ContentGrid>
      </motion.div>
    </HomeContainer>
  );
};