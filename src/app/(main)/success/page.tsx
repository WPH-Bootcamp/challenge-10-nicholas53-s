'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import { useLastOrderStore } from '@/Store/last-order';
import { AuthGuard } from '@/components/shared/auth-guard';

function SuccessContent() {
  const router = useRouter();
  const lastOrder = useLastOrderStore((s) => s.lastOrder);

  useEffect(() => {
    if (!lastOrder) router.replace('/');
  }, [lastOrder, router]);

  if (!lastOrder) return null;

  const totalItems = lastOrder.restaurants.reduce(
    (sum, r) => sum + r.items.reduce((s, it) => s + it.quantity, 0),
    0
  );

  const date = new Date(lastOrder.createdAt).toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const rows = [
    { label: 'Date', value: date },
    { label: 'Payment Method', value: lastOrder.paymentMethod },
    {
      label: `Price (${totalItems} items)`,
      value: `Rp${lastOrder.pricing.subtotal.toLocaleString('id-ID')}`,
    },
    {
      label: 'Delivery Fee',
      value: `Rp${lastOrder.pricing.deliveryFee.toLocaleString('id-ID')}`,
    },
    {
      label: 'Service Fee',
      value: `Rp${lastOrder.pricing.serviceFee.toLocaleString('id-ID')}`,
    },
  ];

  return (
    <div className='mx-auto max-w-md'>
      {/* Logo Foody */}
      <div className='mb-6 flex items-center justify-center gap-2'>
        <Image src='/foody-group.png' alt='Foody' width={32} height={32} />
        <span className='text-xl font-extrabold'>Foody</span>
      </div>

      {/* Kartu konfirmasi */}
      <div className='rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm'>
        {/* Centang hijau + judul */}
        <div className='flex flex-col items-center text-center'>
          <div className='mb-3 flex size-14 items-center justify-center rounded-full bg-green-500'>
            <Check size={28} className='text-white' strokeWidth={3} />
          </div>
          <h1 className='text-lg font-extrabold text-neutral-900'>
            Payment Success
          </h1>
          <p className='text-sm text-neutral-500'>
            Your payment has been successfully processed.
          </p>
        </div>

        {/* Rincian */}
        <div className='mt-6 space-y-3 border-t border-neutral-200 pt-4'>
          {rows.map((row) => (
            <div key={row.label} className='flex justify-between text-sm'>
              <span className='text-neutral-500'>{row.label}</span>
              <span className='font-semibold text-neutral-900'>
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className='mt-4 flex justify-between border-t border-neutral-200 pt-4'>
          <span className='font-bold text-neutral-900'>Total</span>
          <span className='font-extrabold text-neutral-900'>
            Rp{lastOrder.pricing.totalPrice.toLocaleString('id-ID')}
          </span>
        </div>

        {/* Tombol See My Orders */}
        <Link
          href='/orders'
          className='mt-6 block rounded-full bg-primary py-3 text-center text-sm font-bold text-white hover:bg-primary/90'
        >
          See My Orders
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <AuthGuard>
      <div className='px-6 pb-16 pt-28'>
        <SuccessContent />
      </div>
    </AuthGuard>
  );
}
