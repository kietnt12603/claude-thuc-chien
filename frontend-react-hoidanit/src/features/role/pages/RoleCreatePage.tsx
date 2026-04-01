import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { ROUTES } from '@/routes/routes';
import { RoleForm } from '../components/RoleForm';
import type { RoleFormValues } from '../components/RoleForm';
import { useCreateRole } from '../hooks/useCreateRole';

export const RoleCreatePage = () => {
  const navigate = useNavigate();
  const { mutate: createRole, isPending } = useCreateRole();

  const handleCancel = () => navigate(ROUTES.ADMIN_ROLES);

  const handleSubmit = (values: RoleFormValues) => {
    createRole(values, {
      onSuccess: () => {
        navigate(ROUTES.ADMIN_ROLES);
      },
    });
  };

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <button
          onClick={handleCancel}
          className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
          title="Back to list"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create New Role</h1>
      </div>

      <RoleForm 
        onSubmit={handleSubmit} 
        onCancel={handleCancel}
        isLoading={isPending} 
      />
    </div>
  );
};
