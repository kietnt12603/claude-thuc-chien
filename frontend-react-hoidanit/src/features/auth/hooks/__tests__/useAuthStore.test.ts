import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../useAuthStore';

describe('useAuthStore', () => {
  beforeEach(() => {
    // Manually reset the store before each test
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
    });
    localStorage.clear();
  });

  it('should have initial state', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('should update state with setAuth', () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      full_name: 'Test User',
      role: 'customer' as const,
    };
    const mockToken = 'mock-access-token';

    useAuthStore.getState().setAuth(mockUser, mockToken);

    const state = useAuthStore.getState();
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
  });

  it('should clear state with clearAuth', () => {
    // Setup authenticated state
    useAuthStore.setState({
      user: { id: 1, email: 't@t.com', full_name: 'T', role: 'customer' },
      isAuthenticated: true,
    });

    useAuthStore.getState().clearAuth();

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});
