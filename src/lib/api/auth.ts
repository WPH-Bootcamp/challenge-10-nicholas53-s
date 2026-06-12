// src/lib/api/auth.ts
import { api } from './axios';
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  User,
} from '@/Types/auth';

export async function registerRequest(
  payload: RegisterPayload
): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/auth/register', payload);
  return data;
}

export async function loginRequest(
  payload: LoginPayload
): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/auth/login', payload);
  return data;
}

export async function getProfile(): Promise<User> {
  const { data } = await api.get('/auth/profile');
  return data.data ?? data;
}
