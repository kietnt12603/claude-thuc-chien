import { useNavigate, Link } from 'react-router';
import { ROUTES } from '@/routes/routes';
import { RegisterForm } from '../components/RegisterForm';
import { useRegister } from '../hooks/useRegister';
import { useAuthStore } from '../hooks/useAuthStore';
import { useEffect } from 'react';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { mutate: register, isPending, error } = useRegister();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.HOME, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (values: any) => {
    register(values, {
      onSuccess: () => {
        // Redirect to login on success
        navigate(ROUTES.LOGIN, { state: { message: 'Đăng ký thành công! Vui lòng đăng nhập.' } });
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] px-4">
      <RegisterForm 
        onSubmit={handleSubmit} 
        isLoading={isPending} 
        error={error} 
      />
      
      <p className="mt-8 text-center text-sm text-gray-600">
        Đã có tài khoản?{' '}
        <Link 
          to={ROUTES.LOGIN} 
          className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors"
        >
          Đăng nhập ngay
        </Link>
      </p>
    </div>
  );
};
