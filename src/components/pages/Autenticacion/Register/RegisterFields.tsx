// src/pages/Auth/Register/RegisterFields.tsx
import { useState } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import DescriptionIcon from '@mui/icons-material/Description';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PhoneIcon from '@mui/icons-material/Phone';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

interface RegisterFieldsProps {
  formData: {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    descripcion: string;
    ciudad?: string;
    telefono?: string;
    foto_perfil?: string;
  };
  setFormData: (data: {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    descripcion: string;
    ciudad?: string;
    telefono?: string;
    foto_perfil?: string;
  }) => void;
}

const RegisterFields = ({ formData, setFormData }: RegisterFieldsProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'image/jpeg') {
        alert('Solo se permiten archivos JPG');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData({ ...formData, foto_perfil: result });
      };
      reader.readAsDataURL(file);
    }
  };

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
        label="Ciudad"
        value={formData.ciudad || ''}
        onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
        helperText="Entre 3 y 15 caracteres"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocationCityIcon color="primary" />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Teléfono"
        value={formData.telefono || ''}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, '');
          setFormData({ ...formData, telefono: value });
        }}
        helperText="Entre 7 y 10 dígitos numéricos"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PhoneIcon color="primary" />
            </InputAdornment>
          ),
        }}
      />

      <div style={{ marginTop: '16px', marginBottom: '16px' }}>
        <Button
          variant="outlined"
          component="label"
          startIcon={<PhotoCameraIcon />}
          fullWidth
          sx={{ mb: 1 }}
        >
          {formData.foto_perfil ? 'Cambiar Foto de Perfil' : 'Subir Foto de Perfil'}
          <input
            type="file"
            hidden
            accept="image/jpeg"
            onChange={handleImageUpload}
          />
        </Button>
        {formData.foto_perfil && (
          <div style={{ textAlign: 'center', marginTop: '8px' }}>
            <img
              src={formData.foto_perfil}
              alt="Preview"
              style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '8px' }}
            />
          </div>
        )}
        <div style={{ fontSize: '0.75rem', color: '#666', textAlign: 'center' }}>
          Solo archivos JPG permitidos
        </div>
      </div>

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
