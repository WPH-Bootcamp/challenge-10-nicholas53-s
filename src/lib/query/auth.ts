// src/lib/query/auth.ts
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { loginRequest, registerRequest } from '@/lib/api/auth';
import { useAuthStore } from '@/Store/auth';
import type { LoginPayload, RegisterPayload } from '@/Types/auth';
import { AxiosError } from 'axios';

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof AxiosError) {
    return error.response?.data?.message ?? fallback;
  }
  return fallback;
}

// ===== HOOK LOGIN =====
export function useLogin() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginRequest(payload),
    onSuccess: (data) => {
      setAuth(data.data.token, data.data.user);
      toast.success('Login berhasil');
      router.push('/');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Login gagal, coba lagi'));
    },
  });
}

// ===== HOOK REGISTER =====
export function useRegister() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerRequest(payload),
    onSuccess: (data) => {
      setAuth(data.data.token, data.data.user);
      toast.success('Registrasi berhasil');
      router.push('/');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Registrasi gagal, coba lagi'));
    },
  });
}
