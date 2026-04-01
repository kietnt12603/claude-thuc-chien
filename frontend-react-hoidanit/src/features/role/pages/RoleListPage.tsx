import { useNavigate } from 'react-router';
import { Plus, RefreshCw, X } from 'lucide-react';
import { ROUTES } from '@/routes/routes';
import { RoleList } from '../components/RoleList';
import { useRoles } from '../hooks/useRoles';

export const RoleListPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch, isFetching } = useRoles();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">System Roles</h1>
          <p className="mt-1 text-sm text-gray-500">Manage permissions and access levels for your users.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => refetch()}
            disabled={isLoading || isFetching}
            className="p-2.5 text-gray-500 hover:text-gray-700 bg-white rounded-lg border border-gray-200 transition-all hover:bg-gray-50 disabled:opacity-50 shadow-sm"
            title="Refresh List"
          >
            <RefreshCw className={`w-5 h-5 ${isFetching ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => navigate(ROUTES.ADMIN_ROLE_CREATE)}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Create Role
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-gray-500">Fetching latest roles...</p>
        </div>
      ) : isError ? (
        <div className="rounded-xl bg-red-50 border border-red-100 p-6 text-center max-w-md mx-auto shadow-sm">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-red-900">Connection Error</h3>
          <p className="mt-1 text-sm text-red-700">We couldn't connect to the server. Please check your internet and try again.</p>
          <button
            onClick={() => refetch()}
            className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : (
        <RoleList roles={data?.data || []} />
      )}
    </div>
  );
};
