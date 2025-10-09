// src/pages/Auth/Register/RegisterForm.tsx
import { Button, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import RegisterFields from './RegisterFields';

interface RegisterFormProps {
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

const RegisterForm = ({ formData, setFormData, onSubmit, loading }: RegisterFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <RegisterFields formData={formData} setFormData={setFormData} />

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{
            py: 1.5,
            fontSize: '1.1rem',
            borderRadius: '8px',
            background: 'linear-gradient(45deg, #1B5E20 30%, #4CAF50 90%)',
            boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)',
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Registrarse'}
        </Button>
      </motion.div>
    </form>
  );
};

export default RegisterForm;
