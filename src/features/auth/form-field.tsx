'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface FormFieldProps extends React.ComponentProps<'input'> {
  error?: string;
  rightSlot?: React.ReactNode;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ error, rightSlot, className, ...props }, ref) => {
    return (
      <div>
        <div className='relative'>
          <input
            ref={ref}
            className={cn(
              'h-12 w-full rounded-xl border bg-white px-4 text-sm text-neutral-900 outline-none transition',
              'placeholder:text-neutral-500',
              error
                ? 'border-primary'
                : 'border-neutral-300 focus:border-neutral-500',
              rightSlot && 'pr-11',
              className
            )}
            {...props}
          />
          {/* Slot kanan: ikon mata password */}
          {rightSlot && (
            <div className='absolute right-3 top-1/2 -translate-y-1/2'>
              {rightSlot}
            </div>
          )}
        </div>
        {/* Error helper merah di bawah kolom */}
        {error && <p className='mt-1 text-sm text-primary'>{error}</p>}
      </div>
    );
  }
);

FormField.displayName = 'FormField';
