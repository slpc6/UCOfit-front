import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/Theme';
import { ProtectedRoute } from './components/common/ProtectedRoute';

const modules = import.meta.glob('./components/pages/**/*.tsx', { eager: true });

function getRouteFromPath(path: string) {
  const match = path.match(/\.\/components\/pages\/(.*)\.tsx$/);
  if (!match) return null;

  let route = match[1]
    .replace(/\\/g, '/')
    .replace(/index$/i, '')
    .toLowerCase();

  const parts = route.split('/');
  if (parts.length > 1 && parts[parts.length - 1] === parts[parts.length - 2]) {
    parts.pop();
    route = parts.join('/');
  }

  if (!route.startsWith('/')) route = '/' + route;
  return route;
}

const routes = Object.entries(modules)
  .map(([path, mod]: any) => {
    const route = getRouteFromPath(path);
    const Component = mod.default;

    if (!route || !Component) return null;
    return { path: route, Component };
  })
  .filter((r): r is { path: string; Component: any } => r !== null);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
      
        <Routes>
          <Route path="/login" element={<GetPageComponent path="/autenticacion/login" />} />
          <Route path="/autenticacion/register" element={<GetPageComponent path="/autenticacion/register" />} />
          <Route path="/recuperar-contrasena" element={<GetPageComponent path="/autenticacion/passwordrecovery/requestpasswordrecovery" />} />
          <Route path="/resetar-contrasena" element={<GetPageComponent path="/autenticacion/passwordrecovery/resetpassword" />} />

          <Route element={<ProtectedRoute />}>
          {routes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path="/publicacion/:id" element={<GetPageComponent path="/publicacion/verpublicacion" />} />
          <Route path="/reto/verreto/:id" element={<GetPageComponent path="/reto/verreto" />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
          </Route>
        </Routes>
      
      </BrowserRouter>
    </ThemeProvider>
  );
}

function GetPageComponent({ path }: { path: string }) {
  const route = routes.find(r => r.path === path);
  return route ? <route.Component /> : <Navigate to="/autenticacion/login" replace />;
}

export default App;
