// src/components/home/restaurant-card.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import type { Restaurant } from '@/Types/resto';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link
      href={`/resto/${restaurant.id}`}
      className='flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-md'
    >
      <div className='size-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100'>
        {restaurant.logo && (
          <Image
            src={restaurant.logo}
            alt={restaurant.name}
            width={80}
            height={80}
            className='size-full object-cover'
          />
        )}
      </div>

      {/* Info */}
      <div className='min-w-0 flex-1'>
        <h3 className='truncate font-bold text-neutral-900'>
          {restaurant.name}
        </h3>
        <div className='mt-1 flex items-center gap-1'>
          <Star size={16} className='fill-yellow-400 text-yellow-400' />
          <span className='text-sm font-semibold'>{restaurant.star}</span>
        </div>
        <p className='mt-1 truncate text-sm text-neutral-500'>
          {restaurant.place}
          {restaurant.distance != null && ` · ${restaurant.distance} km`}
        </p>
      </div>
    </Link>
  );
}
