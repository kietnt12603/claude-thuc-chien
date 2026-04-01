import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/auth.service';
import type { RegisterPayload } from '../types/auth.types';

export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
  });
};
