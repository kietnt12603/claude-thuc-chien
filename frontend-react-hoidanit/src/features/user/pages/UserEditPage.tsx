import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, UserCircle, Loader2 } from 'lucide-react';
import { ROUTES } from '@/routes/routes';
import { UserForm, type UserFormValues } from '../components/UserForm';
import { useUser } from '../hooks/useUser';
import { useUpdateUser } from '../hooks/useUpdateUser';

export const UserEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: response, isLoading: isLoadingUser } = useUser(Number(id));
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();

  const user = response?.data;

  const handleSubmit = (values: UserFormValues) => {
    if (!id) return;

    // Filter out empty password if not changed
    const payload = { ...values };
    if (!payload.password) {
      delete payload.password;
    }

    updateUser(
      { id: Number(id), data: payload },
      {
        onSuccess: () => navigate(ROUTES.ADMIN_USERS),
      }
    );
  };

  if (isLoadingUser) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
        User not found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(ROUTES.ADMIN_USERS)}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <UserCircle className="w-6 h-6 text-indigo-600" />
            Edit User
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Update user information and role
          </p>
        </div>
      </div>

      <UserForm
        defaultValues={user}
        isEditMode={true}
        onSubmit={handleSubmit}
        onCancel={() => navigate(ROUTES.ADMIN_USERS)}
        isLoading={isUpdating}
      />
    </div>
  );
};
