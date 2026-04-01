import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/auth.service';
import { useAuthStore } from './useAuthStore';
import type { LoginPayload, LoginResponse } from '../types/auth.types';

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: (data: LoginResponse) => {
      setAuth(data.user, data.accessToken);
    },
  });
};
