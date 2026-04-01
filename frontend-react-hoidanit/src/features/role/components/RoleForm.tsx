import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Save, X } from 'lucide-react';
import type { Role } from '../types/role.types';

const schema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Max 50 characters'),
  description: z.string().max(255, 'Max 255 characters').optional().or(z.literal('')),
});

export type RoleFormValues = z.infer<typeof schema>;

interface Props {
  defaultValues?: Role;
  onSubmit: (values: RoleFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const RoleForm = ({ defaultValues, onSubmit, onCancel, isLoading }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoleFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      description: defaultValues?.description ?? '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-xl border border-gray-200">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Role Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register('name')}
            type="text"
            placeholder="e.g. admin, customer, moderator"
            className="block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
          />
          {errors.name && (
            <p className="mt-1.5 text-xs font-medium text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Description
          </label>
          <textarea
            {...register('description')}
            rows={3}
            placeholder="Describe what this role can do..."
            className="block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 placeholder:text-gray-400"
          />
          {errors.description && (
            <p className="mt-1.5 text-xs font-medium text-red-600">{errors.description.message}</p>
          )}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
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
          disabled={isLoading}
          className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-indigo-200"
        >
          <Save className="w-4 h-4" />
          {isLoading ? 'Saving...' : 'Save Role'}
        </button>
      </div>
    </form>
  );
};
