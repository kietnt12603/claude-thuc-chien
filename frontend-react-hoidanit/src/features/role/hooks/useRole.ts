import { useQuery } from '@tanstack/react-query';
import { roleService } from '../services/role.service';

export const useRole = (id?: number) => {
  return useQuery({
    queryKey: ['roles', id],
    queryFn: () => roleService.getById(id!),
    enabled: !!id,
  });
};
