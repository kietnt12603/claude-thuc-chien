import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useRoles } from './useRoles';
import { roleService } from '../services/role.service';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

// Mock service
vi.mock('../services/role.service', () => ({
  roleService: {
    getAll: vi.fn(),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useRoles hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return roles on success', async () => {
    const mockRoles = [{ id: 1, name: 'ADMIN' }];
    (roleService.getAll as any).mockResolvedValue(mockRoles);

    const { result } = renderHook(() => useRoles(), {
      wrapper: createWrapper(),
    });

    // Check loading state
    expect(result.current.isLoading).toBe(true);

    // Wait for success
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockRoles);
  });

  it('should return error on failure', async () => {
    const errorMsg = 'Failed to fetch';
    (roleService.getAll as any).mockRejectedValue(new Error(errorMsg));

    const { result } = renderHook(() => useRoles(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error?.message).toBe(errorMsg);
  });
});
