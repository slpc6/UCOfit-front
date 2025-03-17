import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { Login } from './components/features/Login';
import { Register } from './components/features/Register';
import { Profile } from './components/features/Profile';
import { Home } from './components/pages/Home';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/common/ProtectedRoute';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1B5E20', // Verde oscuro
      light: '#4CAF50', // Verde claro
    },
    secondary: {
      main: '#FFC107', // Amarillo
    },
  },
  // ... resto de la configuración del tema
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rutas protegidas */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Redirigir rutas no encontradas al login o home según autenticación */}
            <Route path="*" element={
              localStorage.getItem('token') ? <Navigate to="/" /> : <Navigate to="/login" />
            } />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;