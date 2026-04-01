import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RoleList } from './RoleList';
import { useNavigate } from 'react-router';
import { useDeleteRole } from '../hooks/useDeleteRole';
import type { Role } from '../types/role.types';

// Mock dependencies
vi.mock('react-router', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('../hooks/useDeleteRole', () => ({
  useDeleteRole: vi.fn(),
}));

describe('RoleList', () => {
  const mockNavigate = vi.fn();
  const mockDeleteMutate = vi.fn();
  
  const mockRoles: Role[] = [
    { id: 1, name: 'ADMIN', description: 'Admin role' },
    { id: 2, name: 'USER', description: '' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as any).mockReturnValue(mockNavigate);
    (useDeleteRole as any).mockReturnValue({
      mutate: mockDeleteMutate,
      isPending: false,
    });
  });

  it('should render empty state when no roles provided', () => {
    render(<RoleList roles={[]} />);
    expect(screen.getByText(/No roles found/i)).toBeInTheDocument();
  });

  it('should render a list of roles', () => {
    render(<RoleList roles={mockRoles} />);
    expect(screen.getByText('ADMIN')).toBeInTheDocument();
    expect(screen.getByText('USER')).toBeInTheDocument();
    expect(screen.getByText('#1')).toBeInTheDocument();
    expect(screen.getByText('#2')).toBeInTheDocument();
  });

  it('should navigate to edit page when edit button clicked', () => {
    render(<RoleList roles={mockRoles} />);
    const editButtons = screen.getAllByTitle(/Edit Role/i);
    fireEvent.click(editButtons[0]);
    expect(mockNavigate).toHaveBeenCalled();
  });

  it('should call delete mutation when delete confirmed', () => {
    vi.stubGlobal('confirm', vi.fn(() => true));
    render(<RoleList roles={mockRoles} />);
    const deleteButtons = screen.getAllByTitle(/Delete Role/i);
    fireEvent.click(deleteButtons[0]);
    expect(mockDeleteMutate).toHaveBeenCalledWith(1);
  });

  it('should not call delete mutation when delete cancelled', () => {
    vi.stubGlobal('confirm', vi.fn(() => false));
    render(<RoleList roles={mockRoles} />);
    const deleteButtons = screen.getAllByTitle(/Delete Role/i);
    fireEvent.click(deleteButtons[0]);
    expect(mockDeleteMutate).not.toHaveBeenCalled();
  });
});
