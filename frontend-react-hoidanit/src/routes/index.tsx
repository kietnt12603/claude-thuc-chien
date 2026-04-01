import { createBrowserRouter } from 'react-router';
import { MainLayout } from '@/layouts/MainLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { AdminLayout } from '@/layouts/AdminLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { AdminRoute } from './AdminRoute';
import { RoleListPage, RoleCreatePage, RoleEditPage } from '@/features/role';
import { UserListPage, UserCreatePage, UserEditPage } from '@/features/user';
import { LoginPage, RegisterPage } from '@/features/auth';

// Pages will be added here as features are built with /fe-crud
const HomePage = () => <div className="p-8 text-center"><h1 className="text-2xl font-bold text-gray-800">Home Page</h1><p className="mt-2 text-gray-600">Chào mừng bạn đến với HoiDanIT Vibe</p></div>;
const NotFoundPage = () => <div className="p-8 text-center"><h1 className="text-2xl font-bold">404 - Not Found</h1></div>;

export const router = createBrowserRouter([
  // Public routes
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      // Add public routes here: products, categories, etc.
    ],
  },

  // Auth routes (login, register)
  {
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },

  // Protected routes (require login)
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          // Add protected routes: cart, checkout, orders, profile
        ],
      },
    ],
  },

  // Admin routes
  {
    path: '/admin',
    element: <AdminRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: 'roles', element: <RoleListPage /> },
          { path: 'roles/create', element: <RoleCreatePage /> },
          { path: 'roles/:id/edit', element: <RoleEditPage /> },
          { path: 'users', element: <UserListPage /> },
          { path: 'users/create', element: <UserCreatePage /> },
          { path: 'users/:id/edit', element: <UserEditPage /> },
          // Add more admin routes here
        ],
      },
    ],
  },

  // 404
  { path: '*', element: <NotFoundPage /> },
]);
