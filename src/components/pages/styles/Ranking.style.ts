import { styled } from '@mui/material/styles';
import { TableRow, Box, Typography, TableCell } from '@mui/material';
import { motion } from 'framer-motion';

export const StyledTableRow = styled(motion.tr)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

export const StyledTableCell = styled(TableCell)({
  whiteSpace: 'nowrap',
  padding: '16px',
});

export const PositionBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8
});

export const UserInfoBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  minWidth: 250
});

export const UserDetailsBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column'
});

export const ScoreTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 'bold'
}));

export const ContainerBox = styled(Box)({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: 32
});

export const HeaderBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  marginBottom: 32
});