'use client';

import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';
import type { CartItem } from '@/Types/cart';
import { useUpdateCartItem, useDeleteCartItem } from '@/lib/query/cart';

export function CartItemRow({ item }: { item: CartItem }) {
  const updateItem = useUpdateCartItem();
  const deleteItem = useDeleteCartItem();

  const quantity = item.quantity;
  const price = `Rp${item.menu.price.toLocaleString('id-ID')}`;

  const handleIncrease = () =>
    updateItem.mutate({ id: item.id, quantity: quantity + 1 });
  const handleDecrease = () => {
    quantity <= 1
      ? deleteItem.mutate(item.id)
      : updateItem.mutate({ id: item.id, quantity: quantity - 1 });
  };

  return (
    <div className='flex items-center gap-3 py-4'>
      <div className='size-16 shrink-0 overflow-hidden rounded-xl bg-neutral-100'>
        {item.menu.image && (
          <Image
            src={item.menu.image}
            alt={item.menu.foodName}
            width={64}
            height={64}
            className='size-full object-cover'
          />
        )}
      </div>

      <div className='min-w-0 flex-1'>
        <p className='truncate text-sm text-neutral-700'>
          {item.menu.foodName}
        </p>
        <p className='mt-0.5 text-lg font-extrabold text-neutral-900'>
          {price}
        </p>
      </div>

      <div className='flex shrink-0 items-center gap-4'>
        <button
          onClick={handleDecrease}
          className='flex size-11 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition hover:bg-neutral-50'
          aria-label='Kurangi'
        >
          <Minus size={20} strokeWidth={2.5} />
        </button>
        <span className='min-w-6 text-center text-base font-bold'>
          {quantity}
        </span>
        <button
          onClick={handleIncrease}
          className='flex size-11 items-center justify-center rounded-full bg-primary text-white transition hover:bg-primary/90'
          aria-label='Tambah'
        >
          <Plus size={20} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
