import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/user.service';
import type { CreateUserPayload } from '../types/user.types';

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserPayload) => userService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
