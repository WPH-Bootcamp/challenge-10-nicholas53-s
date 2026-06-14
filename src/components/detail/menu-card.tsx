'use client';

import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';
import type { Menu } from '@/Types/resto';
import type { CartItem } from '@/Types/cart';
import {
  useAddToCart,
  useUpdateCartItem,
  useDeleteCartItem,
} from '@/lib/query/cart';

interface MenuCardProps {
  menu: Menu;
  restaurantId: number;
  cartItem?: CartItem;
}

export function MenuCard({ menu, restaurantId, cartItem }: MenuCardProps) {
  const addToCart = useAddToCart();
  const updateItem = useUpdateCartItem();
  const deleteItem = useDeleteCartItem();

  const quantity = cartItem?.quantity ?? 0;
  const inCart = quantity > 0;
  const price = `Rp${menu.price.toLocaleString('id-ID')}`;

  const handleAdd = () =>
    addToCart.mutate({ restaurantId, menuId: menu.id, quantity: 1 });
  const handleIncrease = () =>
    cartItem && updateItem.mutate({ id: cartItem.id, quantity: quantity + 1 });
  const handleDecrease = () => {
    if (!cartItem) return;
    quantity <= 1
      ? deleteItem.mutate(cartItem.id)
      : updateItem.mutate({ id: cartItem.id, quantity: quantity - 1 });
  };

  return (
    <div className='overflow-hidden rounded-2xl bg-white shadow-sm'>
      {/* Foto menu */}
      <div className='relative aspect-square w-full bg-neutral-100'>
        {menu.image && (
          <Image
            src={menu.image}
            alt={menu.foodName}
            fill
            className='object-cover'
          />
        )}
      </div>

      {/* Info + aksi: nama & harga di kiri, tombol/stepper di kanan */}
      <div className='flex items-center justify-between gap-2 p-4'>
        <div className='min-w-0'>
          <p className='truncate text-sm text-neutral-700'>{menu.foodName}</p>
          <p className='mt-1 font-extrabold text-neutral-900'>{price}</p>
        </div>

        {!inCart ? (
          <button
            onClick={handleAdd}
            disabled={addToCart.isPending}
            className='shrink-0 rounded-full bg-primary px-6 py-2 text-sm font-bold text-white hover:bg-primary/90 disabled:opacity-60'
          >
            Add
          </button>
        ) : (
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
        )}
      </div>
    </div>
  );
}
