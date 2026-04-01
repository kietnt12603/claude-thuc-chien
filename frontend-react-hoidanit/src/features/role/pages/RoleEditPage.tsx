import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { ROUTES } from '@/routes/routes';
import { RoleForm } from '../components/RoleForm';
import type { RoleFormValues } from '../components/RoleForm';
import { useRole } from '../hooks/useRole';
import { useUpdateRole } from '../hooks/useUpdateRole';

export const RoleEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const roleId = Number(id);

  const { data, isLoading: isFetching } = useRole(roleId);
  const { mutate: updateRole, isPending: isUpdating } = useUpdateRole();

  const handleCancel = () => navigate(ROUTES.ADMIN_ROLES);

  const handleSubmit = (values: RoleFormValues) => {
    updateRole(
      { id: roleId, data: values },
      {
        onSuccess: () => {
          navigate(ROUTES.ADMIN_ROLES);
        },
      }
    );
  };

  if (isFetching) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
        <p className="text-sm font-medium text-gray-500">Loading role details...</p>
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900">Role not found</h2>
        <button
          onClick={handleCancel}
          className="mt-4 text-indigo-600 font-medium hover:underline"
        >
          Back to roles list
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <button
          onClick={handleCancel}
          className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
          title="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Edit Role</h1>
      </div>

      <RoleForm
        defaultValues={data.data}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isUpdating}
      />
    </div>
  );
};
