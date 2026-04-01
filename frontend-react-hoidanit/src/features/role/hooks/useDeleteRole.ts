import { useMutation, useQueryClient } from '@tanstack/react-query';
import { roleService } from '../services/role.service';

export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => roleService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
};
