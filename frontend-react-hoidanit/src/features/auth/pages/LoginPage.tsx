import { useNavigate, useLocation, Link } from 'react-router';
import { ROUTES } from '@/routes/routes';
import { LoginForm } from '../components/LoginForm';
import { useLogin } from '../hooks/useLogin';
import { useAuthStore } from '../hooks/useAuthStore';
import { useEffect } from 'react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate: login, isPending, error } = useLogin();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || ROUTES.HOME;
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = (values: any) => {
    login(values);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] px-4">
      <LoginForm 
        onSubmit={handleSubmit} 
        isLoading={isPending} 
        error={error} 
      />
      
      <p className="mt-8 text-center text-sm text-gray-600">
        Chưa có tài khoản?{' '}
        <Link 
          to={ROUTES.REGISTER} 
          className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors"
        >
          Đăng ký ngay
        </Link>
      </p>
    </div>
  );
};
