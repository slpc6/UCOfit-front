import { styled } from '@mui/material/styles';
import { Paper, Box } from '@mui/material';

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