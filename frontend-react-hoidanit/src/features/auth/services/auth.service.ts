import { axiosInstance } from '@/shared/lib/axios';
import type { 
  LoginPayload, 
  LoginResponse, 
  RegisterPayload, 
  AuthUser,
  UpdateProfilePayload,
  ChangePasswordPayload
} from '../types/auth.types';

export const authService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await axiosInstance.post<{ data: LoginResponse }>('/auth/login', payload);
    return response.data.data;
  },

  register: async (payload: RegisterPayload): Promise<AuthUser> => {
    const response = await axiosInstance.post<{ data: AuthUser }>('/auth/register', payload);
    return response.data.data;
  },

  logout: async (): Promise<void> => {
    await axiosInstance.post('/auth/logout');
  },

  getMe: async (): Promise<AuthUser> => {
    const response = await axiosInstance.get<{ data: AuthUser }>('/auth/me');
    return response.data.data;
  },

  updateProfile: async (payload: UpdateProfilePayload): Promise<AuthUser> => {
    const response = await axiosInstance.patch<{ data: AuthUser }>('/auth/me', payload);
    return response.data.data;
  },

  changePassword: async (payload: ChangePasswordPayload): Promise<void> => {
    await axiosInstance.patch('/auth/change-password', payload);
  },
};
