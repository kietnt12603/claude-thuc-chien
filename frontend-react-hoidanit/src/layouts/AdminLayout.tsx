import { Outlet } from 'react-router';

export const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar - add <AdminSidebar /> here when built */}
      <aside className="w-64 border-r border-gray-200 bg-gray-50 p-4">
        <span className="font-bold text-gray-900">Admin Panel</span>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};
