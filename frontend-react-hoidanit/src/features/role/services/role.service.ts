import axiosInstance from '@/shared/lib/axios';
import type { ApiResponse } from '@/shared/types/api.types';
import type { CreateRolePayload, Role, UpdateRolePayload } from '../types/role.types';

export const roleService = {
  getAll: () =>
    axiosInstance.get<ApiResponse<Role[]>>('/admin/roles').then((res) => res.data),

  getById: (id: number) =>
    axiosInstance.get<ApiResponse<Role>>(`/admin/roles/${id}`).then((res) => res.data),

  create: (data: CreateRolePayload) =>
    axiosInstance.post<ApiResponse<Role>>('/admin/roles', data).then((res) => res.data),

  update: (id: number, data: UpdateRolePayload) =>
    axiosInstance.patch<ApiResponse<Role>>(`/admin/roles/${id}`, data).then((res) => res.data),

  delete: (id: number) =>
    axiosInstance.delete<void>(`/admin/roles/${id}`).then((res) => res.data),
};
