'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/query/cart';

export function CheckoutBar() {
  const { data: cart } = useCart();

  const totalItems = cart?.summary?.totalItems ?? 0;
  const totalPrice = cart?.summary?.totalPrice ?? 0;

  if (totalItems === 0) return null;

  return (
    <div className='fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white px-6 py-4 shadow-lg'>
      <div className='mx-auto flex max-w-6xl items-center justify-between'>
        <div className='flex items-center gap-3'>
          <ShoppingBag className='text-primary' />
          <div>
            <p className='text-sm text-neutral-500'>{totalItems} Items</p>
            <p className='font-extrabold text-neutral-900'>
              Rp{totalPrice.toLocaleString('id-ID')}
            </p>
          </div>
        </div>
        <Link
          href='/cart'
          className='rounded-full bg-primary px-10 py-2.5 text-sm font-bold text-white hover:bg-primary/90'
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
