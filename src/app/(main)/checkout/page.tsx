// src/app/(main)/checkout/page.tsx
'use client';

import { Suspense, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin } from 'lucide-react';
import { useCart } from '@/lib/query/cart';
import { useCheckout } from '@/lib/query/order';
import {
  checkoutSchema,
  type CheckoutFormValues,
} from '@/lib/Validations/checkout';
import { AuthGuard } from '@/components/shared/auth-guard';
import { Button } from '@/components/ui/button';

const DELIVERY_FEE = 10000;
const SERVICE_FEE = 1000;

const PAYMENT_METHODS = [
  { id: 'bni', label: 'Bank Negara Indonesia' },
  { id: 'bri', label: 'Bank Rakyat Indonesia' },
  { id: 'bca', label: 'Bank Central Asia' },
  { id: 'mandiri', label: 'Mandiri' },
];

function CheckoutContent() {
  const searchParams = useSearchParams();
  const restaurantId = Number(searchParams.get('restaurantId'));

  const { data: cart, isLoading } = useCart();
  const checkout = useCheckout();
  const [selectedPayment, setSelectedPayment] = useState('bni');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: 'bni' },
  });

  if (isLoading) {
    return <p className='py-20 text-center text-neutral-500'>Loading...</p>;
  }

  // Ambil grup restoran yang akan di-checkout (dari restaurantId di URL).
  const group = cart?.cart?.find((g) => g.restaurant.id === restaurantId);

  if (!group) {
    return (
      <p className='py-20 text-center text-neutral-500'>
        No items to checkout. Please add items to your cart first.
      </p>
    );
  }

  const subtotal = group.items.reduce((sum, it) => sum + it.itemTotal, 0);
  const totalItems = group.items.reduce((sum, it) => sum + it.quantity, 0);
  const total = subtotal + DELIVERY_FEE + SERVICE_FEE;

  const onSubmit = (values: CheckoutFormValues) => {
    // Bentuk payload sesuai struktur API: restaurants[] berisi grup ini.
    checkout.mutate({
      restaurants: [
        {
          restaurantId: group.restaurant.id,
          items: group.items.map((it) => ({
            menuId: it.menu.id,
            quantity: it.quantity,
          })),
        },
      ],
      deliveryAddress: values.deliveryAddress,
      phone: values.phone,
      paymentMethod: selectedPayment,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='grid grid-cols-1 gap-6 lg:grid-cols-3'
    >
      {/* KIRI: alamat + daftar item */}
      <div className='space-y-6 lg:col-span-2'>
        {/* Delivery Address */}
        <div className='rounded-2xl border border-neutral-200 bg-white p-5'>
          <div className='mb-3 flex items-center gap-2 font-bold'>
            <MapPin size={18} className='text-primary' />
            Delivery Address
          </div>
          <div className='space-y-3'>
            <div>
              <textarea
                {...register('deliveryAddress')}
                rows={2}
                placeholder='Alamat lengkap pengiriman'
                className='w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm outline-none focus:border-neutral-500'
              />
              {errors.deliveryAddress && (
                <p className='mt-1 text-sm text-primary'>
                  {errors.deliveryAddress.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register('phone')}
                placeholder='Nomor telepon'
                className='w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm outline-none focus:border-neutral-500'
              />
              {errors.phone && (
                <p className='mt-1 text-sm text-primary'>
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Daftar item restoran */}
        <div className='rounded-2xl border border-neutral-200 bg-white p-5'>
          <div className='mb-3 flex items-center gap-2 font-bold'>
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
          </div>
          <div className='divide-y divide-neutral-100'>
            {group.items.map((item) => (
              <div key={item.id} className='flex items-center gap-3 py-3'>
                <div className='size-14 shrink-0 overflow-hidden rounded-xl bg-neutral-100'>
                  {item.menu.image && (
                    <Image
                      src={item.menu.image}
                      alt={item.menu.foodName}
                      width={56}
                      height={56}
                      className='size-full object-cover'
                    />
                  )}
                </div>
                <div className='min-w-0 flex-1'>
                  <p className='truncate text-sm text-neutral-700'>
                    {item.menu.foodName}
                  </p>
                  <p className='font-extrabold text-neutral-900'>
                    Rp{item.menu.price.toLocaleString('id-ID')}
                  </p>
                </div>
                <span className='text-sm font-semibold text-neutral-500'>
                  x{item.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KANAN: payment method + summary */}
      <div className='space-y-6'>
        {/* Payment Method */}
        <div className='rounded-2xl border border-neutral-200 bg-white p-5'>
          <p className='mb-4 font-bold'>Payment Method</p>
          <div className='space-y-3'>
            {PAYMENT_METHODS.map((m) => (
              <label
                key={m.id}
                className='flex cursor-pointer items-center justify-between'
              >
                <span className='text-sm'>{m.label}</span>
                <input
                  type='radio'
                  name='payment'
                  checked={selectedPayment === m.id}
                  onChange={() => setSelectedPayment(m.id)}
                  className='size-4 accent-primary'
                />
              </label>
            ))}
          </div>
        </div>

        {/* Payment Summary */}
        <div className='rounded-2xl border border-neutral-200 bg-white p-5'>
          <p className='mb-4 font-bold'>Payment Summary</p>
          <div className='space-y-2 text-sm'>
            <div className='flex justify-between'>
              <span className='text-neutral-500'>
                Price ({totalItems} items)
              </span>
              <span className='font-semibold'>
                Rp{subtotal.toLocaleString('id-ID')}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-neutral-500'>Delivery Fee</span>
              <span className='font-semibold'>
                Rp{DELIVERY_FEE.toLocaleString('id-ID')}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-neutral-500'>Service Fee</span>
              <span className='font-semibold'>
                Rp{SERVICE_FEE.toLocaleString('id-ID')}
              </span>
            </div>
            <div className='flex justify-between border-t border-neutral-200 pt-2'>
              <span className='font-bold'>Total</span>
              <span className='font-extrabold'>
                Rp{total.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          <Button
            type='submit'
            disabled={checkout.isPending}
            className='mt-5 h-12 w-full rounded-full bg-primary font-bold text-white hover:bg-primary/90'
          >
            {checkout.isPending ? 'Processing...' : 'Buy'}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default function CheckoutPage() {
  return (
    <AuthGuard>
      <div className='mx-auto max-w-6xl px-6 pb-16 pt-24'>
        <h1 className='mb-6 text-3xl font-extrabold text-neutral-900'>
          Checkout
        </h1>
        <Suspense fallback={<p className='py-20 text-center'>Loading...</p>}>
          <CheckoutContent />
        </Suspense>
      </div>
    </AuthGuard>
  );
}
