import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { setAccessToken, clearAccessToken } from '@/shared/lib/axios';
import type { AuthUser } from '../types/auth.types';

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  setAuth: (user: AuthUser, token: string) => void;
  clearAuth: () => void;
  updateUser: (user: AuthUser) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      setAuth: (user, token) => {
        setAccessToken(token);
        set({ user, isAuthenticated: true });
      },

      clearAuth: () => {
        clearAccessToken();
        set({ user: null, isAuthenticated: false });
      },

      updateUser: (user) => {
        set({ user });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      // Only persist user data, not session status (which relies on cookie/memory token)
      // Actually, persisting user data helps with UI responsiveness on reload.
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
