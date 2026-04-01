import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/auth.service';
import { useAuthStore } from './useAuthStore';

export const useLogout = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      clearAuth();
      queryClient.clear(); // Clear all user-specific data from query cache
    },
    onError: () => {
      // Even if API fails, clear local auth for safety
      clearAuth();
      queryClient.clear();
    },
  });
};
