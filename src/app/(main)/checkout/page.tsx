'use client';

import { AuthGuard } from '@/components/shared/auth-guard';

export default function CheckoutPage() {
  return (
    <AuthGuard>
      <div className='p-6'>
        <h1 className='text-2xl font-bold'>Checkout</h1>
      </div>
    </AuthGuard>
  );
}
