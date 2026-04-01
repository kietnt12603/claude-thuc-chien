import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RoleListPage } from './RoleListPage';
import { useNavigate } from 'react-router';
import { useRoles } from '../hooks/useRoles';
import { useDeleteRole } from '../hooks/useDeleteRole';

// Mock dependecies
vi.mock('react-router', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('../hooks/useRoles', () => ({
  useRoles: vi.fn(),
}));

vi.mock('../hooks/useDeleteRole', () => ({
  useDeleteRole: vi.fn(),
}));

// Mock component con
vi.mock('../components/RoleList', () => ({
  RoleList: ({ roles }: { roles: any[] }) => (
    <div data-testid="role-list">{roles.length} roles</div>
  ),
}));

describe('RoleListPage', () => {
  const mockNavigate = vi.fn();
  const mockRefetch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as any).mockReturnValue(mockNavigate);
    (useDeleteRole as any).mockReturnValue({ mutate: vi.fn() });
  });

  it('should render loading state', () => {
    (useRoles as any).mockReturnValue({
      isLoading: true,
      data: undefined,
    });

    render(<RoleListPage />);
    expect(screen.getByText(/Fetching latest roles/i)).toBeInTheDocument();
  });

  it('should render error state', () => {
    (useRoles as any).mockReturnValue({
      isLoading: false,
      isError: true,
      refetch: mockRefetch,
    });

    render(<RoleListPage />);
    expect(screen.getByText(/Connection Error/i)).toBeInTheDocument();
    
    const tryAgainBtn = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(tryAgainBtn);
    expect(mockRefetch).toHaveBeenCalled();
  });

  it('should render RoleList when data is available', () => {
    (useRoles as any).mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        success: true,
        data: [{ id: 1, name: 'ADMIN' }, { id: 2, name: 'USER' }],
      },
    });

    render(<RoleListPage />);
    expect(screen.getByTestId('role-list')).toHaveTextContent('2 roles');
  });

  it('should navigate to create page when clicking Create Role', () => {
    (useRoles as any).mockReturnValue({
      isLoading: false,
      data: { data: [] },
    });

    render(<RoleListPage />);
    const createBtn = screen.getByText(/Create Role/i);
    fireEvent.click(createBtn);
    expect(mockNavigate).toHaveBeenCalled();
  });
});
