import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { LogIn, Loader2, AlertCircle } from 'lucide-react';
import type { LoginPayload } from '../types/auth.types';

const schema = z.object({
  email: z.string().email('Email không hợp lệ').max(255),
  password: z.string().min(1, 'Mật khẩu không được để trống'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (values: LoginPayload) => void;
  isLoading?: boolean;
  error?: any;
}

export const LoginForm = ({ onSubmit, isLoading, error }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Chào mừng trở lại</h2>
        <p className="mt-2 text-sm text-gray-500">
          Vui lòng đăng nhập để tiếp tục mua sắm
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-red-50 text-red-700 text-sm border border-red-100">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{error.response?.data?.error?.message || 'Đã có lỗi xảy ra, vui lòng thử lại.'}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              {...register('email')}
              type="email"
              autoComplete="email"
              placeholder="vibe@hoidanit.vn"
              className="block w-full rounded-xl border border-gray-300 px-4 py-3 text-sm shadow-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 placeholder:text-gray-400"
            />
            {errors.email && (
              <p className="mt-1.5 text-xs font-medium text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              id="password"
              {...register('password')}
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className="block w-full rounded-xl border border-gray-300 px-4 py-3 text-sm shadow-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 placeholder:text-gray-400"
            />
            {errors.password && (
              <p className="mt-1.5 text-xs font-medium text-red-600">{errors.password.message}</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 cursor-pointer select-none">
              Ghi nhớ đăng nhập
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
              Quên mật khẩu?
            </a>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="group relative flex w-full justify-center items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-bold text-white transition-all hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-indigo-200"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <LogIn className="h-5 w-5" />
              Đăng nhập ngay
            </>
          )}
        </button>
      </form>
    </div>
  );
};
