import type { Role } from '../../role/types/role.types';

export interface User {
  id: number;
  email: string;
  full_name: string;
  phone?: string;
  role_id: number;
  is_active: boolean;
  role?: Role; // optional because relation might not be returned in some light endpoints
  created_at?: string;
  updated_at?: string;
}

export interface CreateUserPayload {
  email: string;
  password?: string;
  fullName: string;
  phone?: string;
  roleId: number;
  isActive?: boolean;
}

export interface UpdateUserPayload {
  email?: string;
  fullName?: string;
  phone?: string;
  roleId?: number;
  isActive?: boolean;
}
