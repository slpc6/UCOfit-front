import { Navigate, Outlet } from 'react-router-dom';
import {Layout} from '../layout/Layout'

export const ProtectedRoute = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};