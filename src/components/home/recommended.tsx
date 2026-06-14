// src/components/home/recommended.tsx
'use client';

import { useState } from 'react';
import { useRestaurants } from '@/lib/query/resto';
import { RestaurantCard } from './restaurant-card';

export function Recommended() {
  // Ambil data restoran dari API (endpoint publik, jalan utk login & visitor).
  const { data, isLoading, isError } = useRestaurants();

  // Berapa banyak kartu yang ditampilkan. "Show More" menambah jumlahnya.
  const [visibleCount, setVisibleCount] = useState(12);

  const restaurants = data ?? [];
  const visible = restaurants.slice(0, visibleCount);
  const hasMore = visibleCount < restaurants.length;

  return (
    <section className='mx-auto max-w-6xl px-6 py-10'>
      {/* Header: judul + See All */}
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-2xl font-extrabold text-neutral-900'>
          Recommended
        </h2>
        <button className='text-sm font-bold text-primary'>See All</button>
      </div>

      {/* Loading state */}
      {isLoading && (
        <p className='py-10 text-center text-neutral-500'>
          Loading restaurants...
        </p>
      )}

      {/* Error state */}
      {isError && (
        <p className='py-10 text-center text-primary'>
          Failed to load restaurants. Please try again.
        </p>
      )}

      {/* Data: grid kartu — 1 kolom mobile, 3 kolom desktop */}
      {!isLoading && !isError && (
        <>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
            {visible.map((resto) => (
              <RestaurantCard key={resto.id} restaurant={resto} />
            ))}
          </div>

          {/* Tombol Show More — hanya muncul kalau masih ada sisa */}
          {hasMore && (
            <div className='mt-8 flex justify-center'>
              <button
                onClick={() => setVisibleCount((c) => c + 6)}
                className='rounded-full border border-neutral-300 px-8 py-2.5 text-sm font-bold text-neutral-900 transition hover:bg-neutral-50'
              >
                Show More
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
