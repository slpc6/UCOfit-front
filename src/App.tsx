import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { Login } from './components/features/Login';
import { Register } from './components/features/Register';
import { Home } from './components/pages/Home';
import { Profile } from './components/pages/Profile';
import { MisPublicaciones } from './components/pages/MisPublicaciones';
import { CrearPublicacion } from './components/pages/CrearPublicacion';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Creamos un tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#1B5E20', // Verde oscuro
      light: '#4CAF50', // Verde claro
    },
    secondary: {
      main: '#FFC107', // Amarillo
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #1B5E20 30%, #4CAF50 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #0d3910 30%, #3d8c40 90%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  // Verificar si hay un token almacenado
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/login" element={
              isAuthenticated ? <Navigate to="/" /> : <Login />
            } />
            <Route path="/register" element={
              isAuthenticated ? <Navigate to="/" /> : <Register />
            } />

            {/* Rutas protegidas */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/mis-publicaciones" element={<MisPublicaciones />} />
              <Route path="/crear-publicacion" element={<CrearPublicacion />} />
            </Route>

            {/* Redirigir rutas no encontradas */}
            <Route path="*" element={
              isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" />
            } />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;