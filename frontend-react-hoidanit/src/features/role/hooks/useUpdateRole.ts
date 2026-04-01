import { useMutation, useQueryClient } from '@tanstack/react-query';
import { roleService } from '../services/role.service';
import type { UpdateRolePayload } from '../types/role.types';

export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateRolePayload }) =>
      roleService.update(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      queryClient.setQueryData(['roles', response.data.id], response.data);
    },
  });
};
