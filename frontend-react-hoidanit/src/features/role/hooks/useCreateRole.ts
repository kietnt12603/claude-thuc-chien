import { useMutation, useQueryClient } from '@tanstack/react-query';
import { roleService } from '../services/role.service';
import type { CreateRolePayload } from '../types/role.types';

export const useCreateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRolePayload) => roleService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
};
