// src/app/(main)/page.tsx
import { Hero } from '@/components/home/hero';
import { Categories } from '@/components/home/catagories';
import { Recommended } from '@/components/home/recommended';

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Categories />
      <Recommended />
    </div>
  );
}
