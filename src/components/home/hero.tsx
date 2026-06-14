// src/components/home/hero.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';

// Hero: gambar burger gelap + judul + search bar.
// Search bar sudah menyimpan input (state), siap disambungkan
// ke pencarian di tahap berikutnya.
export function Hero() {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    // TODO: sambungkan ke pencarian (tahap berikutnya).
    // Misal: router.push(`/?search=${query}`) atau panggil useSearchRestaurants.
    console.log('Search:', query);
  };

  return (
    <section className='relative h-[480px] w-full overflow-hidden'>
      {/* Gambar burger sebagai background */}
      <Image
        src='/hero-burger.png'
        alt='Delicious burger'
        fill
        priority
        className='object-cover'
      />
      {/* Lapisan gelap di atas gambar supaya teks putih terbaca */}
      <div className='absolute inset-0 bg-black/40' />

      {/* Konten di tengah */}
      <div className='relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white'>
        <h1 className='max-w-3xl text-4xl font-extrabold md:text-5xl'>
          Explore Culinary Experiences
        </h1>
        <p className='mt-3 max-w-xl text-base md:text-lg'>
          Search and refine your choice to discover the perfect restaurant.
        </p>

        {/* Search bar */}
        <div className='mt-8 flex w-full max-w-xl items-center gap-3 rounded-full bg-white px-5 py-3 shadow-lg'>
          <Search className='text-neutral-400' size={20} />
          <input
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder='Search restaurants, food and drink'
            className='w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400'
          />
        </div>
      </div>
    </section>
  );
}
