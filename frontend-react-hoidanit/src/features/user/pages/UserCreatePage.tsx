import { useNavigate } from 'react-router';
import { ArrowLeft, UserCircle } from 'lucide-react';
import { ROUTES } from '@/routes/routes';
import { UserForm, type UserFormValues } from '../components/UserForm';
import { useCreateUser } from '../hooks/useCreateUser';

export const UserCreatePage = () => {
  const navigate = useNavigate();
  const { mutate: createUser, isPending } = useCreateUser();

  const handleSubmit = (values: UserFormValues) => {
    createUser(values, {
      onSuccess: () => navigate(ROUTES.ADMIN_USERS),
    });
  };

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
            Create New User
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Add a new user to the system and assign their role
          </p>
        </div>
      </div>

      <UserForm
        onSubmit={handleSubmit}
        onCancel={() => navigate(ROUTES.ADMIN_USERS)}
        isLoading={isPending}
      />
    </div>
  );
};
