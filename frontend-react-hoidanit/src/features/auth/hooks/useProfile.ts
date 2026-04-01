import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { authService } from '../services/auth.service';
import { useAuthStore } from './useAuthStore';
import type { AuthUser } from '../types/auth.types';

export const useProfile = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const updateUser = useAuthStore((state) => state.updateUser);

  const query = useQuery<AuthUser>({
    queryKey: ['auth', 'me'],
    queryFn: () => authService.getMe(),
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (query.data) {
      updateUser(query.data);
    }
  }, [query.data, updateUser]);

  return query;
};
