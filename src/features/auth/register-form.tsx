// src/features/auth/register-form.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import {
  registerSchema,
  type RegisterFormValues,
} from '@/lib/Validations/auth';
import { useRegister } from '@/lib/query/auth';
import { Button } from '@/components/ui/button';
import { FormField } from './form-field';

export function RegisterForm() {
  const { mutate: registerUser, isPending } = useRegister();
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) });

  const onSubmit = (values: RegisterFormValues) => {
    const { confirmPassword, ...payload } = values;
    void confirmPassword;
    registerUser(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <FormField
        placeholder='Name'
        error={errors.name?.message}
        {...register('name')}
      />

      <FormField
        type='email'
        placeholder='Email'
        error={errors.email?.message}
        {...register('email')}
      />

      <FormField
        placeholder='Number Phone'
        error={errors.phone?.message}
        {...register('phone')}
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

      <FormField
        type={showCpw ? 'text' : 'password'}
        placeholder='Confirm Password'
        error={errors.confirmPassword?.message}
        rightSlot={
          <button
            type='button'
            onClick={() => setShowCpw((s) => !s)}
            className='text-neutral-500'
            aria-label='Toggle password'
          >
            {showCpw ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        }
        {...register('confirmPassword')}
      />

      <Button
        type='submit'
        disabled={isPending}
        className='h-12 w-full rounded-full bg-primary text-base font-bold hover:bg-primary/90 text-white'
      >
        {isPending ? 'Loading...' : 'Register'}
      </Button>
    </form>
  );
}
