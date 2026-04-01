import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/auth.service';
import type { ChangePasswordPayload } from '../types/auth.types';

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) => authService.changePassword(payload),
  });
};
