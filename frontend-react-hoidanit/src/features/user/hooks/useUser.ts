import { useQuery } from '@tanstack/react-query';
import { userService } from '../services/user.service';

export const useUser = (id: number) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => userService.getById(id),
    enabled: !!id,
  });
};
