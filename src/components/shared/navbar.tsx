'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import { useAuthStore } from '@/Store/auth';
import { useCart } from '@/lib/query/cart';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);

  const isLoggedIn = hasHydrated && !!token;

  const { data: cart } = useCart();
  const cartCount = cart?.summary?.totalItems ?? 0;

  return (
    <header className='sticky top-0 z-50 w-full bg-white/95 backdrop-blur'>
      <div className='mx-auto flex max-w-6xl items-center justify-between px-6 py-4'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-2'>
          <Image src='/foody-group.png' alt='Foody' width={32} height={32} />
          <span className='text-xl font-extrabold'>Foody</span>
        </Link>

        {/* Kanan: berubah tergantung login */}
        {isLoggedIn ? (
          // SUDAH LOGIN: cart + user
          <div className='flex items-center gap-4'>
            <Link href='/cart' className='relative'>
              <ShoppingBag className='text-neutral-800' />
              {cartCount > 0 && (
                <span className='absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white'>
                  {cartCount}
                </span>
              )}
            </Link>
            <div className='flex items-center gap-2'>
              <div className='size-9 overflow-hidden rounded-full bg-neutral-200'>
                {user?.avatar && (
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={36}
                    height={36}
                  />
                )}
              </div>
              <span className='text-sm font-semibold'>{user?.name}</span>
            </div>
          </div>
        ) : (
          // BELUM LOGIN: Sign In / Sign Up
          <div className='flex items-center gap-3'>
            <Link href='/login'>
              <Button
                variant='outline'
                className='rounded-full border-neutral-300 px-6'
              >
                Sign In
              </Button>
            </Link>
            <Link href='/register'>
              <Button className='rounded-full bg-primary px-6 hover:bg-primary/90'>
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
