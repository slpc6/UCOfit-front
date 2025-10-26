import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
  CircularProgress,
  Alert,
  Grid,
  Pagination
} from '@mui/material';
import { motion } from 'framer-motion';
import { LoginContainer, LoginPaper } from '../Autenticacion/Login/style';
import { retoService } from '../../../services/retoService';
import { Reto } from '../../../types/reto';

const ListarRetos = () => {
  const navigate = useNavigate();
  const [retos, setRetos] = useState<Reto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;


  useEffect(() => {
    const fetchRetos = async () => {
      try {
        const offset = (page - 1) * itemsPerPage;
        const response = await retoService.listar(true, itemsPerPage, offset);
        
        if (response.data) {
          setRetos(response.data.retos || []);
          setTotalPages(response.data.total_paginas || 1);
        } else {
          setError(response.message || 'Error al cargar los retos');
        }
      } catch (err) {
        setError(`Error al cargar los retos. ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchRetos();
  }, [page]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };


  const getDiasRestantesColor = (dias: number) => {
    if (dias <= 3) return 'error';
    if (dias <= 7) return 'warning';
    return 'success';
  };


  if (loading) {
    return (
      <LoginContainer sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </LoginContainer>
    );
  }

  return (
    <LoginContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: '1200px' }}
      >
        <LoginPaper elevation={3}>
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography 
                variant="h4" 
                component="h1" 
                sx={{ 
                  color: 'primary.main',
                  fontWeight: 'bold'
                }}
              >
                🏆 Retos Activos
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'text.secondary'
                }}
              >
                Únete a los retos disponibles o crea el tuyo
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button
                variant="contained"
                onClick={() => navigate('/reto/crearreto')}
                sx={{
                  borderRadius: '8px',
                  background: 'linear-gradient(45deg, #1B5E20 30%, #4CAF50 90%)',
                  boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)',
                }}
              >
                Crear Reto
              </Button>
            </Box>
          </Box>

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
                {error}
              </Alert>
            </motion.div>
          )}

          <Grid container spacing={3}>
            {retos.map((reto, index) => (
              <Grid item xs={12} sm={6} md={4} key={reto.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 6
                      }
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                          🏆 {reto.titulo}
                        </Typography>
                        <Chip 
                          label={`${reto.dias_restantes} días`}
                          color={getDiasRestantesColor(reto.dias_restantes)}
                          size="small"
                        />
                      </Box>
                      
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ mb: 2, minHeight: '60px' }}
                      >
                        {reto.descripcion}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Chip 
                          label="Ver publicaciones"
                          color="primary"
                          variant="outlined"
                          size="small"
                        />
                      </Box>
                    </CardContent>
                    
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button 
                        size="small" 
                        variant="outlined"
                        onClick={() => navigate(`/reto/verreto/${reto.id}`)}
                        sx={{ flexGrow: 1 }}
                      >
                        Ver Detalles
                      </Button>
                      <Button 
                        size="small" 
                        variant="contained"
                        onClick={() => navigate(`/publicacion/crearpublicacion?reto=${reto.id}`)}
                        sx={{
                          background: 'linear-gradient(45deg, #1B5E20 30%, #4CAF50 90%)',
                        }}
                      >
                        Participar
                      </Button>
                    </CardActions>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {retos.length === 0 && !loading && (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                No hay retos activos
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                ¡Sé el primero en crear un reto!
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/reto/crearreto')}
                sx={{
                  borderRadius: '8px',
                  background: 'linear-gradient(45deg, #1B5E20 30%, #4CAF50 90%)',
                  boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)',
                }}
              >
                Crear Mi Primer Reto
              </Button>
            </Box>
          )}

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </LoginPaper>
      </motion.div>
    </LoginContainer>
  );
};

export default ListarRetos;
