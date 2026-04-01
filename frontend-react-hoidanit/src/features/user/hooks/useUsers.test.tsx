import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useUsers } from './useUsers';
import { userService } from '../services/user.service';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

// Mock service
vi.mock('../services/user.service', () => ({
  userService: {
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

describe('useUsers hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return users on success', async () => {
    const mockUsers = [{ id: 1, email: 'admin@example.com', full_name: 'Admin' }];
    (userService.getAll as any).mockResolvedValue({ data: mockUsers });

    const { result } = renderHook(() => useUsers(), {
      wrapper: createWrapper(),
    });

    // Check loading state
    expect(result.current.isLoading).toBe(true);

    // Wait for success
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({ data: mockUsers });
  });

  it('should return error on failure', async () => {
    const errorMsg = 'Failed to fetch';
    (userService.getAll as any).mockRejectedValue(new Error(errorMsg));

    const { result } = renderHook(() => useUsers(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error?.message).toBe(errorMsg);
  });
});
