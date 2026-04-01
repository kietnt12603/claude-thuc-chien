import { Navigate, Outlet } from 'react-router';
import { ROUTES } from './routes';
import { useAuthStore } from '@/features/auth';

export const AdminRoute = () => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
};
