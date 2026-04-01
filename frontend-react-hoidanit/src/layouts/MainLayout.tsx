import { Outlet, Link } from 'react-router';
import { LogOut, User as UserIcon, LayoutDashboard } from 'lucide-react';
import { useAuthStore, useLogout } from '@/features/auth';
import { ROUTES } from '@/routes/routes';

export const MainLayout = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  return (
    <div className="min-h-screen bg-gray-50/30">
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to={ROUTES.HOME} className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold italic">V</div>
            <span className="text-xl font-extrabold tracking-tight text-gray-900">VibeShop</span>
          </Link>

          <nav className="flex items-center gap-4 sm:gap-6">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {user?.role === 'ADMIN' && (
                  <Link 
                    to={ROUTES.ADMIN_USERS} 
                    className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Quản trị
                  </Link>
                )}
                <Link 
                  to={ROUTES.PROFILE}
                  className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all shadow-sm"
                >
                  <UserIcon className="w-4 h-4" />
                  <span className="max-w-[100px] truncate">{user?.full_name}</span>
                </Link>
                <button
                  onClick={() => logout()}
                  disabled={isLoggingOut}
                  className="flex items-center gap-1.5 rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all disabled:opacity-50"
                  title="Đăng xuất"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link 
                  to={ROUTES.LOGIN}
                  className="text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  Đăng nhập
                </Link>
                <Link 
                  to={ROUTES.REGISTER}
                  className="hidden sm:block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-100"
                >
                  Tham gia ngay
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Outlet />
      </main>

      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <p className="text-sm text-gray-500">© 2026 HoiDanIT VibeShop. Powered by NestJS & React.</p>
        </div>
      </footer>
    </div>
  );
};
