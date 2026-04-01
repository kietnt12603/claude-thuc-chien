import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Save, X, Loader2 } from 'lucide-react';
import type { User } from '../types/user.types';
import { useRoles } from '../../role/hooks/useRoles';

const schema = z.object({
  email: z.string().email('Email invalid').max(255, 'Max 255 characters'),
  password: z.string().max(255, 'Max 255 characters').optional().or(z.literal('')),
  fullName: z.string().min(1, 'FullName is required').max(100, 'Max 100 characters'),
  phone: z.string().max(20, 'Max 20 characters').optional().or(z.literal('')),
  roleId: z.coerce.number().min(1, 'Role is required'),
  isActive: z.boolean().default(true),
});

export type UserFormValues = z.infer<typeof schema>;

interface Props {
  defaultValues?: Partial<User>;
  isEditMode?: boolean;
  onSubmit: (values: UserFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const UserForm = ({ defaultValues, isEditMode = false, onSubmit, onCancel, isLoading }: Props) => {
  const { data: rolesResponse, isLoading: isRolesLoading, error: rolesError } = useRoles();
  const roles = rolesResponse?.data || [];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: defaultValues?.email ?? '',
      password: '',
      fullName: defaultValues?.full_name ?? '',
      phone: defaultValues?.phone ?? '',
      roleId: defaultValues?.role_id ?? 0,
      isActive: defaultValues?.is_active ?? true,
    },
  });

  return (
    <form onSubmit={handleSubmit((values) => onSubmit(values as UserFormValues))} className="space-y-6 bg-white p-6 rounded-xl border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            {...register('email')}
            type="email"
            placeholder="admin@example.com"
            className="block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
          />
          {errors.email && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Password {!isEditMode && <span className="text-red-500">*</span>}
          </label>
          <input
            {...register('password')}
            type="password"
            placeholder={isEditMode ? "Leave empty to keep current" : "••••••••"}
            className="block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
          />
          {errors.password && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.password.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register('fullName')}
            type="text"
            placeholder="John Doe"
            className="block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
          />
          {errors.fullName && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.fullName.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Phone
          </label>
          <input
            {...register('phone')}
            type="text"
            placeholder="+123456789"
            className="block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
          />
          {errors.phone && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Role <span className="text-red-500">*</span>
          </label>
          <select
            {...register('roleId')}
            disabled={isRolesLoading || !!rolesError}
            className="block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 disabled:bg-gray-100"
          >
            <option value="0" disabled>Select a role...</option>
            {roles.map((r: any) => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
          {isRolesLoading && <p className="mt-1 text-xs text-gray-500 flex items-center gap-1"><Loader2 className="w-3 h-3 animate-spin"/> Loading roles...</p>}
          {errors.roleId && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.roleId.message}</p>}
        </div>

        <div className="flex items-center mt-6">
          <input
            {...register('isActive')}
            type="checkbox"
            id="isActive"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
            Account is Active
          </label>
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading || isRolesLoading}
          className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-indigo-200"
        >
          <Save className="w-4 h-4" />
          {isLoading ? 'Saving...' : 'Save User'}
        </button>
      </div>
    </form>
  );
};
