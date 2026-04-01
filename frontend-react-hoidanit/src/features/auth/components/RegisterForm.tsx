import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { UserPlus, Loader2, AlertCircle } from 'lucide-react';
import type { RegisterPayload } from '../types/auth.types';

const schema = z.object({
  fullName: z.string().min(1, 'Họ tên không được để trống').max(100),
  email: z.string().email('Email không hợp lệ').max(255),
  password: z.string().min(6, 'Mật khẩu phải từ 6 ký tự').max(255),
  confirmPassword: z.string().min(1, 'Vui lòng xác nhận mật khẩu'),
  phone: z.string().max(20).optional().or(z.literal('')),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (values: RegisterPayload) => void;
  isLoading?: boolean;
  error?: any;
}

export const RegisterForm = ({ onSubmit, isLoading, error }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
    },
  });

  return (
    <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Tạo tài khoản mới</h2>
        <p className="mt-2 text-sm text-gray-500">
          Tham gia cùng HoiDanIT để tận hưởng ưu đãi
        </p>
      </div>

      <form onSubmit={handleSubmit((data) => {
        const { confirmPassword, ...payload } = data;
        onSubmit(payload as RegisterPayload);
      })} className="mt-8 space-y-5">
        
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-red-50 text-red-700 text-sm border border-red-100">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{error.response?.data?.error?.message || 'Đã có lỗi xảy ra, vui lòng thử lại.'}</p>
          </div>
        )}

        <div>
          <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-1">
            Họ tên <span className="text-red-500">*</span>
          </label>
          <input
            id="fullName"
            {...register('fullName')}
            type="text"
            placeholder="Nguyễn Văn A"
            className="block w-full rounded-xl border border-gray-300 px-4 py-3 text-sm shadow-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 placeholder:text-gray-400"
          />
          {errors.fullName && (
            <p className="mt-1.5 text-xs font-medium text-red-600">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            {...register('email')}
            type="email"
            placeholder="vibe@hoidanit.vn"
            className="block w-full rounded-xl border border-gray-300 px-4 py-3 text-sm shadow-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 placeholder:text-gray-400"
          />
          {errors.email && (
            <p className="mt-1.5 text-xs font-medium text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">
            Số điện thoại
          </label>
          <input
            id="phone"
            {...register('phone')}
            type="text"
            placeholder="09xx xxx xxx"
            className="block w-full rounded-xl border border-gray-300 px-4 py-3 text-sm shadow-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 placeholder:text-gray-400"
          />
          {errors.phone && (
            <p className="mt-1.5 text-xs font-medium text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
            Mật khẩu <span className="text-red-500">*</span>
          </label>
          <input
            id="password"
            {...register('password')}
            type="password"
            placeholder="••••••••"
            className="block w-full rounded-xl border border-gray-300 px-4 py-3 text-sm shadow-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 placeholder:text-gray-400"
          />
          {errors.password && (
            <p className="mt-1.5 text-xs font-medium text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-1">
            Xác nhận mật khẩu <span className="text-red-500">*</span>
          </label>
          <input
            id="confirmPassword"
            {...register('confirmPassword')}
            type="password"
            placeholder="••••••••"
            className="block w-full rounded-xl border border-gray-300 px-4 py-3 text-sm shadow-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 placeholder:text-gray-400"
          />
          {errors.confirmPassword && (
            <p className="mt-1.5 text-xs font-medium text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="group relative flex w-full justify-center items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-bold text-white transition-all hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 shadow-lg shadow-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <UserPlus className="h-5 w-5" />
              Đăng ký tài khoản
            </>
          )}
        </button>
      </form>
    </div>
  );
};
