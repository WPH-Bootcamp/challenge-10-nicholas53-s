'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useMyOrders } from '@/lib/query/order';
import { OrderCard } from '@/components/orders/order-card';
import { AuthGuard } from '@/components/shared/auth-guard';

const STATUS_TABS: { label: string; value: string }[] = [
  { label: 'Preparing', value: 'preparing' },
  { label: 'On the Way', value: 'on_the_way' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Done', value: 'done' },
  { label: 'Canceled', value: 'cancelled' },
];

function OrdersContent() {
  const { data: orders, isLoading, isError } = useMyOrders();
  const [activeStatus, setActiveStatus] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  if (isLoading) {
    return (
      <p className='py-20 text-center text-neutral-500'>Loading orders...</p>
    );
  }
  if (isError) {
    return (
      <p className='py-20 text-center text-primary'>Failed to load orders.</p>
    );
  }

  const allOrders = orders ?? [];

  // Filter berdasarkan status (kalau dipilih) & search (nama restoran).
  const filtered = allOrders.filter((order) => {
    const matchStatus = activeStatus ? order.status === activeStatus : true;
    const matchSearch = search
      ? order.restaurants.some((r) =>
          r.restaurant.name.toLowerCase().includes(search.toLowerCase())
        )
      : true;
    return matchStatus && matchSearch;
  });

  return (
    <div className='rounded-2xl bg-white p-5 shadow-sm'>
      {/* Search */}
      <div className='flex items-center gap-3 rounded-full border border-neutral-300 px-4 py-2.5'>
        <Search size={18} className='text-neutral-400' />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search'
          className='w-full bg-transparent text-sm outline-none'
        />
      </div>

      {/* Filter status */}
      <div className='mt-4 flex flex-wrap items-center gap-3'>
        <span className='font-bold text-neutral-900'>Status</span>
        {STATUS_TABS.map((status) => (
          <button
            key={status.value}
            onClick={() =>
              setActiveStatus((prev) =>
                prev === status.value ? null : status.value
              )
            }
            className={
              'rounded-full border px-4 py-1.5 text-sm font-semibold transition ' +
              (activeStatus === status.value
                ? 'border-primary text-primary'
                : 'border-neutral-300 text-neutral-700')
            }
          >
            {status.label}
          </button>
        ))}
      </div>

      {/* Daftar order */}
      <div className='mt-6 space-y-5'>
        {filtered.length === 0 ? (
          <p className='py-16 text-center text-neutral-500'>
            {allOrders.length === 0
              ? 'You have no orders yet.'
              : 'No orders match this filter.'}
          </p>
        ) : (
          filtered.map((order) => <OrderCard key={order.id} order={order} />)
        )}
      </div>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <AuthGuard>
      <div className='mx-auto max-w-4xl px-6 pb-16 pt-24'>
        <h1 className='mb-6 text-3xl font-extrabold text-neutral-900'>
          My Orders
        </h1>
        <OrdersContent />
      </div>
    </AuthGuard>
  );
}
