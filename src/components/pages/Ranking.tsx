import { useState, useEffect } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  Box,
  CircularProgress,
  Alert,
  Pagination
} from '@mui/material';
import { motion } from 'framer-motion';
import { LoginContainer, LoginPaper } from './Autenticacion/Login/style';
import { rankingService } from '../../services/rankingService';
import { UsuarioRanking } from '../../types/reto';

const Ranking = () => {
  const [ranking, setRanking] = useState<UsuarioRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const offset = (page - 1) * itemsPerPage;
        const response = await rankingService.obtenerRankingGeneral(itemsPerPage, offset);
        
        if (response.data) {
          setRanking(response.data.ranking || []);
          setTotalPages(response.data.total_paginas || 1);
        } else {
          setError(response.message || 'Error al cargar el ranking');
        }
      } catch (err) {
        setError(`Error al cargar el ranking. ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, [page]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const getInitials = (nombre: string, apellido: string) => {
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
  };

  const getPositionColor = (posicion: number) => {
    if (posicion === 1) return '#FFD700'; // Oro
    if (posicion === 2) return '#C0C0C0'; // Plata
    if (posicion === 3) return '#CD7F32'; // Bronce
    return 'primary.main';
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
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                color: 'primary.main',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              🏆 Ranking General
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                textAlign: 'center',
                mt: 2,
                color: 'text.secondary'
              }}
            >
              Clasificación de usuarios por puntuación total
            </Typography>
          </Box>

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
                {error}
              </Alert>
            </motion.div>
          )}

          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Posición</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Usuario</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Ciudad</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Publicaciones</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Puntuación Total</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Promedio</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ranking.map((usuario, index) => (
                  <motion.tr
                    key={usuario.usuario_id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <TableCell align="center">
                      <Chip
                        label={usuario.posicion}
                        sx={{
                          backgroundColor: getPositionColor(usuario.posicion),
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '1rem'
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar 
                          src={usuario.foto_perfil}
                          sx={{ 
                            width: 40, 
                            height: 40,
                            bgcolor: 'primary.main'
                          }}
                        >
                          {getInitials(usuario.nombre, usuario.apellido)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {usuario.nombre} {usuario.apellido}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {usuario.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      {usuario.ciudad || 'No especificada'}
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
                        {usuario.total_publicaciones || 0}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        {usuario.puntuacion_total.toFixed(1)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body1">
                        {usuario.promedio_puntuacion.toFixed(1)} ⭐
                      </Typography>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}

          {ranking.length === 0 && !loading && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                No hay usuarios en el ranking aún
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                ¡Participa en retos y crea publicaciones para aparecer en el ranking!
              </Typography>
            </Box>
          )}
        </LoginPaper>
      </motion.div>
    </LoginContainer>
  );
};

export default Ranking;
