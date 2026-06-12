'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/Store/auth';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return;

    if (!token) {
      router.replace('/login');
    }
  }, [hasHydrated, token, router]);

  if (!hasHydrated) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <p>Memuat...</p>
      </div>
    );
  }

  if (!token) return null;

  return <>{children}</>;
}
