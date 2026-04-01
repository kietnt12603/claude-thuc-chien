import { useNavigate } from 'react-router';
import { Edit2, Trash2, Shield } from 'lucide-react';
import { ROUTES } from '@/routes/routes';
import { useDeleteRole } from '../hooks/useDeleteRole';
import type { Role } from '../types/role.types';

interface Props {
  roles: Role[];
}

export const RoleList = ({ roles }: Props) => {
  const navigate = useNavigate();
  const { mutate: deleteRole, isPending } = useDeleteRole();

  const handleDelete = (role: Role) => {
    if (!window.confirm(`Are you sure you want to delete the role "${role.name}"?`)) return;
    deleteRole(role.id);
  };

  if (roles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
        <Shield className="w-12 h-12 mb-4 text-gray-300" />
        <p className="text-lg font-medium">No roles found</p>
        <p className="text-sm">Start by creating a new role for your system.</p>
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
              Role Name
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {roles.map((role) => (
            <tr key={role.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                #{role.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="shrink-0 h-8 w-8 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-semibold text-gray-900">{role.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                {role.description || <span className="italic text-gray-400">No description</span>}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => navigate(ROUTES.ADMIN_ROLE_EDIT.replace(':id', String(role.id)))}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-transparent hover:border-indigo-100"
                    title="Edit Role"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(role)}
                    disabled={isPending}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100 disabled:opacity-50"
                    title="Delete Role"
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
