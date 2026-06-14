// src/app/(main)/page.tsx
import { Suspense } from 'react';
import { Hero } from '@/components/home/hero';
import { Categories } from '@/components/home/catagories';
import { Recommended } from '@/components/home/recommended';

export default function HomePage() {
  return (
    <div>
      <Suspense fallback={<div className='h-[480px]' />}>
        <Hero />
      </Suspense>

      <Categories />

      <Suspense fallback={<p className='py-10 text-center'>Loading...</p>}>
        <Recommended />
      </Suspense>
    </div>
  );
}
