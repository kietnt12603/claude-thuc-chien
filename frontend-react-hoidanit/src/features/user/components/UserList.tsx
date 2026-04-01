import { useNavigate } from 'react-router';
import { Edit2, Trash2, UserCircle } from 'lucide-react';
import { ROUTES } from '@/routes/routes';
import { useDeleteUser } from '../hooks/useDeleteUser';
import type { User } from '../types/user.types';

interface Props {
  users: User[];
}

export const UserList = ({ users }: Props) => {
  const navigate = useNavigate();
  const { mutate: deleteUser, isPending } = useDeleteUser();

  const handleDelete = (user: User) => {
    if (!window.confirm(`Are you sure you want to delete user "${user.full_name}"?`)) return;
    deleteUser(user.id);
  };

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
        <UserCircle className="w-12 h-12 mb-4 text-gray-300" />
        <p className="text-lg font-medium">No users found</p>
        <p className="text-sm">Start by creating a new user.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-white shadow-sm ring-1 ring-black ring-opacity-5 sm:rounded-xl">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              User Info
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                #{user.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <UserCircle className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-semibold text-gray-900">{user.full_name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                    {user.phone && <div className="text-xs text-gray-400 mt-0.5">{user.phone}</div>}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {user.role?.name || `RoleID: ${user.role_id}`}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.is_active ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Inactive
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => navigate(ROUTES.ADMIN_USER_EDIT.replace(':id', String(user.id)))}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-transparent hover:border-indigo-100"
                    title="Edit User"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(user)}
                    disabled={isPending}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100 disabled:opacity-50"
                    title="Delete User"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
