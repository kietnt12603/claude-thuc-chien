import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/auth.service';
import { useAuthStore } from './useAuthStore';
import type { UpdateProfilePayload, AuthUser } from '../types/auth.types';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const updateUser = useAuthStore((state) => state.updateUser);

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => authService.updateProfile(payload),
    onSuccess: (data: AuthUser) => {
      updateUser(data);
      queryClient.setQueryData(['auth', 'me'], data);
    },
  });
};
