import { Navigate, Outlet, useLocation } from 'react-router';
import { ROUTES } from './routes';
import { useAuthStore } from '@/features/auth';

export const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <Outlet />;
};
