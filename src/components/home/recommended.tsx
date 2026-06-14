'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRestaurants, useSearchRestaurants } from '@/lib/query/resto';
import { RestaurantCard } from './restaurant-card';

export function Recommended() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') ?? '';
  const isSearching = searchQuery.trim().length > 0;

  const searchResult = useSearchRestaurants(searchQuery);
  const listResult = useRestaurants();

  const { data, isLoading, isError } = isSearching ? searchResult : listResult;

  const [visibleCount, setVisibleCount] = useState(12);
  const restaurants = data ?? [];
  const visible = restaurants.slice(0, visibleCount);
  const hasMore = visibleCount < restaurants.length;

  return (
    <section className='mx-auto max-w-6xl px-6 py-10'>
      {/* Header: judul berubah sesuai mode */}
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-2xl font-extrabold text-neutral-900'>
          {isSearching ? `Search results for "${searchQuery}"` : 'Recommended'}
        </h2>
        {!isSearching && (
          <button className='text-sm font-bold text-primary'>See All</button>
        )}
      </div>

      {/* Loading */}
      {isLoading && (
        <p className='py-10 text-center text-neutral-500'>
          Loading restaurants...
        </p>
      )}

      {/* Error */}
      {isError && (
        <p className='py-10 text-center text-primary'>
          Failed to load restaurants. Please try again.
        </p>
      )}

      {/* Empty state — tidak ada hasil */}
      {!isLoading && !isError && restaurants.length === 0 && (
        <p className='py-10 text-center text-neutral-500'>
          {isSearching
            ? `No restaurants found for "${searchQuery}".`
            : 'No restaurants available.'}
        </p>
      )}

      {/* Data */}
      {!isLoading && !isError && restaurants.length > 0 && (
        <>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
            {visible.map((resto) => (
              <RestaurantCard key={resto.id} restaurant={resto} />
            ))}
          </div>

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
