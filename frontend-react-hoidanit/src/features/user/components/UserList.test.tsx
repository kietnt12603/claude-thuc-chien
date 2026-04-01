import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserList } from './UserList';
import { useNavigate } from 'react-router';
import { useDeleteUser } from '../hooks/useDeleteUser';
import type { User } from '../types/user.types';

// Mock dependencies
vi.mock('react-router', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('../hooks/useDeleteUser', () => ({
  useDeleteUser: vi.fn(),
}));

describe('UserList', () => {
  const mockNavigate = vi.fn();
  const mockDeleteMutate = vi.fn();
  
  const mockUsers: User[] = [
    {
      id: 1,
      email: 'admin@example.com',
      full_name: 'Admin User',
      role_id: 1,
      is_active: true,
      role: { id: 1, name: 'ADMIN' },
    },
    {
      id: 2,
      email: 'john@example.com',
      full_name: 'John Doe',
      role_id: 2,
      is_active: false,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as any).mockReturnValue(mockNavigate);
    (useDeleteUser as any).mockReturnValue({
      mutate: mockDeleteMutate,
      isPending: false,
    });
  });

  it('should render empty state when no users provided', () => {
    render(<UserList users={[]} />);
    expect(screen.getByText(/No users found/i)).toBeInTheDocument();
  });

  it('should render a list of users', () => {
    render(<UserList users={mockUsers} />);
    expect(screen.getByText('Admin User')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Inactive')).toBeInTheDocument();
    expect(screen.getByText('#1')).toBeInTheDocument();
    expect(screen.getByText('#2')).toBeInTheDocument();
  });

  it('should navigate to edit page when edit button clicked', () => {
    render(<UserList users={mockUsers} />);
    const editButtons = screen.getAllByTitle(/Edit User/i);
    fireEvent.click(editButtons[0]);
    expect(mockNavigate).toHaveBeenCalled();
  });

  it('should call delete mutation when delete confirmed', () => {
    vi.stubGlobal('confirm', vi.fn(() => true));
    render(<UserList users={mockUsers} />);
    const deleteButtons = screen.getAllByTitle(/Delete User/i);
    fireEvent.click(deleteButtons[0]);
    expect(mockDeleteMutate).toHaveBeenCalledWith(1);
  });

  it('should not call delete mutation when delete cancelled', () => {
    vi.stubGlobal('confirm', vi.fn(() => false));
    render(<UserList users={mockUsers} />);
    const deleteButtons = screen.getAllByTitle(/Delete User/i);
    fireEvent.click(deleteButtons[0]);
    expect(mockDeleteMutate).not.toHaveBeenCalled();
  });
});
