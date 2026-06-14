// src/components/orders/order-card.tsx
import Image from 'next/image';
import type { Order } from '@/Types/order';

export function OrderCard({ order }: { order: Order }) {
  return (
    <div className='space-y-4 rounded-2xl border border-neutral-200 bg-white p-5'>
      {/* Tiap restoran dalam order */}
      {order.restaurants.map((resto, idx) => (
        <div key={idx} className='space-y-3'>
          {/* Header restoran */}
          <div className='flex items-center gap-2 font-bold text-neutral-900'>
            <div className='size-7 overflow-hidden rounded-full bg-neutral-100'>
              {resto.logo && (
                <Image
                  src={resto.logo}
                  alt={resto.name}
                  width={28}
                  height={28}
                />
              )}
            </div>
            {resto.name}
          </div>

          {/* Item dalam restoran ini */}
          {resto.items.map((item, i) => (
            <div key={i} className='flex items-center gap-3'>
              <div className='size-16 shrink-0 overflow-hidden rounded-xl bg-neutral-100'>
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.menuName}
                    width={64}
                    height={64}
                    className='size-full object-cover'
                  />
                )}
              </div>
              <div className='min-w-0 flex-1'>
                <p className='truncate text-sm text-neutral-700'>
                  {item.menuName}
                </p>
                <p className='font-bold text-neutral-900'>
                  {item.quantity} x Rp{item.price.toLocaleString('id-ID')}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Footer: total + give review */}
      <div className='flex items-center justify-between border-t border-neutral-200 pt-4'>
        <div>
          <p className='text-sm text-neutral-500'>Total</p>
          <p className='text-lg font-extrabold text-neutral-900'>
            Rp{order.pricing.totalPrice.toLocaleString('id-ID')}
          </p>
        </div>
        {/* Give Review — tampilan saja untuk sekarang (bonus) */}
        <button className='rounded-full bg-primary px-8 py-2.5 text-sm font-bold text-white hover:bg-primary/90'>
          Give Review
        </button>
      </div>
    </div>
  );
}
