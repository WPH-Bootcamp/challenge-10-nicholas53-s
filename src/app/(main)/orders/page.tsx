'use client';

import { AuthGuard } from '@/components/shared/auth-guard';

export default function OrdersPage() {
  return (
    <AuthGuard>
      <div className='p-6'>
        <h1 className='text-2xl font-bold'>Riwayat Pesanan</h1>
      </div>
    </AuthGuard>
  );
}
