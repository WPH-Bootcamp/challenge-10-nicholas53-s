'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/Store/auth';
import { useCart } from '@/lib/query/cart';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Navbar() {
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);
  const isLoggedIn = hasHydrated && !!token;

  const { data: cart } = useCart();
  const cartCount = cart?.summary?.totalItems ?? 0;

  const pathname = usePathname();
  const isHome = pathname === '/';

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparent = isHome && !scrolled;
  const isDarkText = !isTransparent;

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-colors duration-300',
        isTransparent ? 'bg-transparent' : 'bg-white shadow-sm'
      )}
    >
      <div className='mx-auto flex max-w-6xl items-center justify-between px-6 py-4'>
        <Link href='/' className='flex items-center gap-2'>
          <Image src='/foody-group.png' alt='Foody' width={32} height={32} />
          {/* Teks "Foody" hilang di mobile, muncul di md ke atas */}
          <span
            className={cn(
              'hidden text-xl font-extrabold transition-colors md:inline',
              isDarkText ? 'text-neutral-900' : 'text-white'
            )}
          >
            Foody
          </span>
        </Link>

        {isLoggedIn ? (
          <div className='flex items-center gap-4'>
            <Link href='/cart' className='relative'>
              {/* Cart 2 warna: hitam saat navbar putih, putih saat transparan */}
              <Image
                src={isDarkText ? '/cart-icon-black.png' : '/cart-icon.png'}
                alt='Cart'
                width={24}
                height={24}
              />
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
              <span
                className={cn(
                  'text-sm font-semibold transition-colors',
                  isDarkText ? 'text-neutral-900' : 'text-white'
                )}
              >
                {user?.name}
              </span>
            </div>
          </div>
        ) : (
          <div className='flex items-center gap-3'>
            <Link href='/login'>
              <Button
                variant='outline'
                className={cn(
                  'rounded-full px-6 transition-colors',
                  isDarkText
                    ? 'border-neutral-300 text-neutral-900'
                    : 'border-white bg-transparent text-white hover:bg-white/10'
                )}
              >
                Sign In
              </Button>
            </Link>
            <Link href='/register'>
              <Button className='rounded-full bg-primary px-6 text-white hover:bg-primary/90'>
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
