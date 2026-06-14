'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';

type AuthMode = 'login' | 'register';

export function AuthCard({ mode }: { mode: AuthMode }) {
  const isLogin = mode === 'login';

  return (
    <div className='flex min-h-screen'>
      {/* KIRI: gambar burger — hanya tampil di desktop (md ke atas) */}
      <div className='relative hidden w-1/2 md:block'>
        <Image
          src='/auth-hero.png'
          alt='Foody'
          fill
          className='object-cover'
          priority
        />
      </div>

      {/* KANAN: area form */}
      <div className='flex w-full items-center justify-center p-6 md:w-1/2'>
        <div className='w-full max-w-md'>
          {/* Logo Foody */}
          <div className='mb-6 flex items-center gap-2'>
            <Image
              src='/foody-group.png'
              alt='Foody-logo'
              width={32}
              height={32}
            />
            <span className='text-xl font-extrabold'>Foody</span>
          </div>

          {/* Heading */}
          <h1 className='text-3xl font-extrabold text-neutral-950'>
            Welcome Back
          </h1>
          <p className='mt-1 text-neutral-600'>
            Good to see you again! Let’s eat
          </p>

          <div className='mt-6 flex rounded-2xl bg-neutral-100 p-1'>
            <Link
              href='/login'
              className={cn(
                'flex-1 rounded-xl py-2 text-center text-sm font-semibold transition',
                isLogin ? 'bg-white shadow-sm' : 'text-neutral-500'
              )}
            >
              Sign in
            </Link>
            <Link
              href='/register'
              className={cn(
                'flex-1 rounded-xl py-2 text-center text-sm font-semibold transition',
                !isLogin ? 'bg-white shadow-sm' : 'text-neutral-500'
              )}
            >
              Sign up
            </Link>
          </div>

          {/* FORM sesuai mode */}
          <div className='mt-6'>
            {isLogin ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>
      </div>
    </div>
  );
}
