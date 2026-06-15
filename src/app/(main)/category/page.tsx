'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X } from 'lucide-react';
import { useRestaurants } from '@/lib/query/resto';
import { RestaurantCard } from '@/components/home/restaurant-card';

const DISTANCE_OPTIONS = [
  { label: 'Nearby', value: '1' },
  { label: 'Within 1 km', value: '1' },
  { label: 'Within 3 km', value: '3' },
  { label: 'Within 5 km', value: '5' },
];
const RATING_OPTIONS = [5, 4, 3, 2, 1];

function CategoryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [range, setRange] = useState(searchParams.get('range') ?? '');
  const [rating, setRating] = useState(searchParams.get('rating') ?? '');
  const [priceMin, setPriceMin] = useState(searchParams.get('priceMin') ?? '');
  const [priceMax, setPriceMax] = useState(searchParams.get('priceMax') ?? '');

  // Panel filter mobile: buka/tutup.
  const [showFilter, setShowFilter] = useState(false);

  const params = {
    range: searchParams.get('range')
      ? Number(searchParams.get('range'))
      : undefined,
    rating: searchParams.get('rating')
      ? Number(searchParams.get('rating'))
      : undefined,
    priceMin: searchParams.get('priceMin')
      ? Number(searchParams.get('priceMin'))
      : undefined,
    priceMax: searchParams.get('priceMax')
      ? Number(searchParams.get('priceMax'))
      : undefined,
  };

  const { data, isLoading, isError } = useRestaurants(params);
  const restaurants = data ?? [];

  const applyFilter = () => {
    const sp = new URLSearchParams();
    if (range) sp.set('range', range);
    if (rating) sp.set('rating', rating);
    if (priceMin) sp.set('priceMin', priceMin);
    if (priceMax) sp.set('priceMax', priceMax);
    router.push(`/category?${sp.toString()}`);
    setShowFilter(false);
  };

  const resetFilter = () => {
    setRange('');
    setRating('');
    setPriceMin('');
    setPriceMax('');
    router.push('/category');
    setShowFilter(false);
  };

  const filterBody = (
    <div className='space-y-6'>
      <p className='font-bold'>FILTER</p>

      {/* Distance */}
      <div>
        <p className='mb-3 font-semibold'>Distance</p>
        <div className='space-y-2'>
          {DISTANCE_OPTIONS.map((opt, i) => (
            <label key={i} className='flex items-center gap-2 text-sm'>
              <input
                type='radio'
                name='distance'
                checked={range === opt.value}
                onChange={() => setRange(opt.value)}
                className='size-4 accent-primary'
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <p className='mb-3 font-semibold'>Price</p>
        <div className='space-y-2'>
          <input
            type='number'
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            placeholder='Minimum Price'
            className='w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none'
          />
          <input
            type='number'
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            placeholder='Maximum Price'
            className='w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none'
          />
        </div>
      </div>

      {/* Rating */}
      <div>
        <p className='mb-3 font-semibold'>Rating</p>
        <div className='space-y-2'>
          {RATING_OPTIONS.map((r) => (
            <label key={r} className='flex items-center gap-2 text-sm'>
              <input
                type='radio'
                name='rating'
                checked={rating === String(r)}
                onChange={() => setRating(String(r))}
                className='size-4 accent-primary'
              />
              ⭐ {r}
            </label>
          ))}
        </div>
      </div>

      <div className='space-y-2'>
        <button
          onClick={applyFilter}
          className='w-full rounded-full bg-primary py-2.5 text-sm font-bold text-white hover:bg-primary/90'
        >
          Apply Filter
        </button>
        <button
          onClick={resetFilter}
          className='w-full rounded-full border border-neutral-300 py-2.5 text-sm font-bold text-neutral-700'
        >
          Reset
        </button>
      </div>
    </div>
  );

  return (
    <div className='grid grid-cols-1 gap-6 lg:grid-cols-4'>
      {/* ===== SIDEBAR FILTER — DESKTOP saja ===== */}
      <aside className='hidden h-fit rounded-2xl border border-neutral-200 bg-white p-5 lg:col-span-1 lg:block'>
        {filterBody}
      </aside>

      {/* ===== Grid restoran ===== */}
      <div className='lg:col-span-3'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-extrabold'>All Restaurant</h2>
          {/* Tombol FILTER — MOBILE saja (buka panel) */}
          <button
            onClick={() => setShowFilter(true)}
            className='flex items-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold lg:hidden'
          >
            <SlidersHorizontal size={16} /> Filter
          </button>
        </div>

        {isLoading && (
          <p className='py-10 text-center text-neutral-500'>Loading...</p>
        )}
        {isError && (
          <p className='py-10 text-center text-primary'>Failed to load.</p>
        )}
        {!isLoading && !isError && restaurants.length === 0 && (
          <p className='py-10 text-center text-neutral-500'>
            No restaurants match this filter.
          </p>
        )}
        {!isLoading && !isError && restaurants.length > 0 && (
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            {restaurants.map((resto) => (
              <RestaurantCard key={resto.id} restaurant={resto} />
            ))}
          </div>
        )}
      </div>

      {/* ===== OVERLAY FILTER — MOBILE saja ===== */}
      {showFilter && (
        <div className='fixed inset-0 z-50 lg:hidden'>
          {/* Backdrop gelap */}
          <div
            className='absolute inset-0 bg-black/40'
            onClick={() => setShowFilter(false)}
          />
          {/* Panel filter */}
          <div className='absolute left-0 top-0 h-full w-80 max-w-[85%] overflow-y-auto bg-white p-5 shadow-xl'>
            <div className='mb-4 flex justify-end'>
              <button onClick={() => setShowFilter(false)} aria-label='Tutup'>
                <X size={20} />
              </button>
            </div>
            {filterBody}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CategoryPage() {
  return (
    <div className='mx-auto max-w-6xl px-6 pb-16 pt-24'>
      <Suspense fallback={<p className='py-20 text-center'>Loading...</p>}>
        <CategoryContent />
      </Suspense>
    </div>
  );
}
