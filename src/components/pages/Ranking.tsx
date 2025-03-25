import { useState, useEffect } from 'react';
import { 
  Typography, 
  Paper, 
  CircularProgress, 
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Box,
  Tooltip,
  Chip
} from '@mui/material';
import { motion } from 'framer-motion';
import { puntuacionService } from '../../services/puntuacionService';
import { UserProfile } from '../../types/user';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import {
  StyledTableRow,
  StyledTableCell,
  PositionBox,
  UserInfoBox,
  UserDetailsBox,
  ScoreTypography,
  ContainerBox,
  HeaderBox
} from './styles/Ranking.style';

const getMedalColor = (position: number) => {
  switch(position) {
    case 0: return '#FFD700';
    case 1: return '#C0C0C0';
    case 2: return '#CD7F32';
    default: return 'transparent';
  }
};

export const Ranking = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const data = await puntuacionService.rankingUsuarios();
        setUsers(data.usuarios);
      } catch (err) {
        console.error(err);
        setError('Error al cargar el ranking');
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, []);

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '50vh'
      }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ContainerBox>
        <Paper elevation={3} sx={{ p: 4 }}>
          <HeaderBox>
            <EmojiEventsIcon sx={{ fontSize: 40, color: 'primary.main' }} />
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
              Ranking de Usuarios
            </Typography>
          </HeaderBox>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Posición</StyledTableCell>
                  <StyledTableCell>Usuario</StyledTableCell>
                  <StyledTableCell>Rol</StyledTableCell>
                  <StyledTableCell align="right">Puntuación</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <StyledTableRow
                    key={user.email}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <StyledTableCell>
                      <PositionBox>
                        {index < 3 && (
                          <Tooltip title={`${index + 1}º Lugar`}>
                            <EmojiEventsIcon 
                              sx={{ 
                                color: getMedalColor(index),
                                filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.25))'
                              }} 
                            />
                          </Tooltip>
                        )}
                        #{index + 1}
                      </PositionBox>
                    </StyledTableCell>
                    <StyledTableCell>
                      <UserInfoBox>
                        <Tooltip title={user.descripcion || 'Sin descripción'}>
                          <Avatar sx={{ 
                            bgcolor: user.rol === 'administrador' ? 'secondary.main' : 'primary.main'
                          }}>
                            {user.nombre.charAt(0)}{user.apellido.charAt(0)}
                          </Avatar>
                        </Tooltip>
                        <UserDetailsBox>
                          <Typography>
                            {user.nombre} {user.apellido}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {user.email}
                          </Typography>
                        </UserDetailsBox>
                      </UserInfoBox>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Chip
                        icon={user.rol === 'administrador' ? <AdminPanelSettingsIcon /> : <PersonIcon />}
                        label={user.rol}
                        color={user.rol === 'administrador' ? 'secondary' : 'default'}
                        variant="outlined"
                      />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <ScoreTypography variant="h6">
                        {user.puntuacion}
                      </ScoreTypography>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </ContainerBox>
    </motion.div>
  );
};
