'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
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

  // Deteksi scroll: scrolled=false saat di atas, true setelah scroll turun.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Kalau sudah scroll lebih dari 10px, anggap "scrolled".
      setScrolled(window.scrollY > 10);
    };
    handleScroll(); // cek posisi awal saat mount
    window.addEventListener('scroll', handleScroll);
    // Bersihkan listener saat komponen dilepas (hindari memory leak).
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Warna teks & logo: putih saat di atas (transparan), gelap saat scrolled.
  const isDarkText = scrolled;

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-colors duration-300',
        scrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      )}
    >
      <div className='mx-auto flex max-w-6xl items-center justify-between px-6 py-4'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-2'>
          <Image src='/foody-group.png' alt='Foody' width={32} height={32} />
          <span
            className={cn(
              'text-xl font-extrabold transition-colors',
              isDarkText ? 'text-neutral-900' : 'text-white'
            )}
          >
            Foody
          </span>
        </Link>

        {/* Kanan: berubah tergantung login */}
        {isLoggedIn ? (
          <div className='flex items-center gap-4'>
            <Link href='/cart' className='relative'>
              <ShoppingBag
                className={cn(
                  'transition-colors',
                  isDarkText ? 'text-neutral-800' : 'text-white'
                )}
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
