import { useNavigate } from 'react-router';
import { Plus, Users, Loader2 } from 'lucide-react';
import { ROUTES } from '@/routes/routes';
import { UserList } from '../components/UserList';
import { useUsers } from '../hooks/useUsers';

export const UserListPage = () => {
  const navigate = useNavigate();
  const { data: response, isLoading, error } = useUsers();

  const users = response?.data || [];

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
        Failed to load users: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-600" />
            Users Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your system users, their roles, and privileges
          </p>
        </div>
        <button
          onClick={() => navigate(ROUTES.ADMIN_USER_CREATE)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add User
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        </div>
      ) : (
        <UserList users={users} />
      )}
    </div>
  );
};
