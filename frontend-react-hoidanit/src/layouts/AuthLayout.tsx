import { Outlet } from 'react-router';

export const AuthLayout = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50/50 px-4 py-12">
      <Outlet />
    </div>
  );
};
