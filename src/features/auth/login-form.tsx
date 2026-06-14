// src/features/auth/login-form.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { loginSchema, type LoginFormValues } from '@/lib/Validations/auth';
import { useLogin } from '@/lib/query/auth';
import { Button } from '@/components/ui/button';
import { FormField } from './form-field';

export function LoginForm() {
  const { mutate: login, isPending } = useLogin();
  const [showPw, setShowPw] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (values: LoginFormValues) => login(values);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <FormField
        type='email'
        placeholder='Email'
        error={errors.email?.message}
        {...register('email')}
      />

      <FormField
        type={showPw ? 'text' : 'password'}
        placeholder='Password'
        error={errors.password?.message}
        rightSlot={
          <button
            type='button'
            onClick={() => setShowPw((s) => !s)}
            className='text-neutral-500'
            aria-label='Toggle password'
          >
            {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        }
        {...register('password')}
      />

      <label className='flex items-center gap-2 text-sm text-neutral-700'>
        <input type='checkbox' className='size-4 accent-primary' />
        Remember Me
      </label>

      <Button
        type='submit'
        disabled={isPending}
        className='h-12 w-full rounded-full bg-primary text-base font-bold hover:bg-primary/90 text-white'
      >
        {isPending ? 'Loading...' : 'Login'}
      </Button>
    </form>
  );
}
