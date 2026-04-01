import axiosInstance from '@/shared/lib/axios';
import type { ApiResponse } from '@/shared/types/api.types';
import type { CreateUserPayload, User, UpdateUserPayload } from '../types/user.types';

export const userService = {
  getAll: () =>
    axiosInstance.get<ApiResponse<User[]>>('/admin/users').then((res) => res.data),

  getById: (id: number) =>
    axiosInstance.get<ApiResponse<User>>(`/admin/users/${id}`).then((res) => res.data),

  create: (data: CreateUserPayload) =>
    axiosInstance.post<ApiResponse<User>>('/admin/users', data).then((res) => res.data),

  update: (id: number, data: UpdateUserPayload) =>
    axiosInstance.patch<ApiResponse<User>>(`/admin/users/${id}`, data).then((res) => res.data),

  delete: (id: number) =>
    axiosInstance.delete<void>(`/admin/users/${id}`).then((res) => res.data),
};
