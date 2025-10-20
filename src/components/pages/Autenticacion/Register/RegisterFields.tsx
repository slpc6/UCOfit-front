// src/pages/Auth/Register/RegisterFields.tsx
import { useState } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import DescriptionIcon from '@mui/icons-material/Description';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface RegisterFieldsProps {
  formData: any;
  setFormData: (data: any) => void;
}

const RegisterFields = ({ formData, setFormData }: RegisterFieldsProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <TextField
        fullWidth
        margin="normal"
        label="Nombre"
        value={formData.nombre}
        onChange={(e) => {
          const newData = { ...formData, nombre: e.target.value };
          setFormData(newData);
        }}
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon color="primary" />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Apellido"
        value={formData.apellido}
        onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon color="primary" />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon color="primary" />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Contraseña"
        type={showPassword ? 'text' : 'password'}
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
        helperText="Mínimo 8 caracteres"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon color="primary" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Descripción"
        multiline
        rows={3}
        value={formData.descripcion}
        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <DescriptionIcon color="primary" />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />
    </>
  );
};

export default RegisterFields;
