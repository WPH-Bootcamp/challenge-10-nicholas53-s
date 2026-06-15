'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Trash2 } from 'lucide-react';
import { useCart, useClearCart } from '@/lib/query/cart';
import { CartItemRow } from '@/components/cart/cart-item-row';
import { AuthGuard } from '@/components/shared/auth-guard';

function CartContent() {
  const { data: cart, isLoading, isError } = useCart();
  const clearCart = useClearCart();

  if (isLoading) {
    return (
      <p className='py-20 text-center text-neutral-500'>Loading cart...</p>
    );
  }
  if (isError) {
    return (
      <p className='py-20 text-center text-primary'>Failed to load cart.</p>
    );
  }

  const groups = cart?.cart ?? [];

  if (groups.length === 0) {
    return (
      <div className='py-20 text-center'>
        <p className='text-neutral-500'>Your cart is empty.</p>
        <Link
          href='/'
          className='mt-4 inline-block rounded-full bg-primary px-8 py-2.5 text-sm font-bold text-white'
        >
          Browse Restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Tombol kosongkan seluruh cart */}
      <div className='flex justify-end'>
        <button
          onClick={() => clearCart.mutate()}
          disabled={clearCart.isPending}
          className='flex items-center gap-2 text-sm font-semibold text-primary hover:underline disabled:opacity-60'
        >
          <Trash2 size={16} />
          {clearCart.isPending ? 'Clearing...' : 'Clear Cart'}
        </button>
      </div>

      {groups.map((group) => {
        const subtotal = group.items.reduce((sum, it) => sum + it.itemTotal, 0);
        return (
          <div
            key={group.restaurant.id}
            className='rounded-2xl border border-neutral-200 bg-white p-5'
          >
            {/* Header grup: logo + nama restoran */}
            <Link
              href={`/resto/${group.restaurant.id}`}
              className='flex items-center gap-2 font-bold text-neutral-900'
            >
              <div className='size-7 overflow-hidden rounded-full bg-neutral-100'>
                {group.restaurant.logo && (
                  <Image
                    src={group.restaurant.logo}
                    alt={group.restaurant.name}
                    width={28}
                    height={28}
                  />
                )}
              </div>
              {group.restaurant.name}
              <ChevronRight size={16} className='text-neutral-400' />
            </Link>

            {/* List item */}
            <div className='mt-2 divide-y divide-neutral-100'>
              {group.items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>

            {/* Footer grup: total + checkout */}
            <div className='mt-4 flex items-center justify-between border-t border-neutral-200 pt-4'>
              <div>
                <p className='text-sm text-neutral-500'>Total</p>
                <p className='text-lg font-extrabold text-neutral-900'>
                  Rp{subtotal.toLocaleString('id-ID')}
                </p>
              </div>
              {/* Checkout per restoran — bawa restaurantId lewat URL */}
              <Link
                href={`/checkout?restaurantId=${group.restaurant.id}`}
                className='rounded-full bg-primary px-10 py-2.5 text-sm font-bold text-white hover:bg-primary/90'
              >
                Checkout
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function CartPage() {
  return (
    <AuthGuard>
      <div className='mx-auto max-w-3xl px-6 pb-16 pt-24'>
        <h1 className='mb-6 text-3xl font-extrabold text-neutral-900'>
          My Cart
        </h1>
        <CartContent />
      </div>
    </AuthGuard>
  );
}
