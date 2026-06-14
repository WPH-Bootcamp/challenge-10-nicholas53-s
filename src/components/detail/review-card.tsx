// src/components/detail/review-card.tsx
import Image from 'next/image';
import { Star } from 'lucide-react';
import type { Review } from '@/Types/resto';

export function ReviewCard({ review }: { review: Review }) {
  // Format tanggal: 25 August 2025, 13:38
  const date = new Date(review.createdAt).toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <div className='rounded-2xl bg-white p-5 shadow-sm'>
      {/* Header: avatar + nama + tanggal */}
      <div className='flex items-center gap-3'>
        <div className='size-11 overflow-hidden rounded-full bg-neutral-200'>
          {review.user?.avatar && (
            <Image
              src={review.user.avatar}
              alt={review.user.name}
              width={44}
              height={44}
              className='size-full object-cover'
            />
          )}
        </div>
        <div>
          <p className='font-bold text-neutral-900'>{review.user?.name}</p>
          <p className='text-xs text-neutral-500'>{date}</p>
        </div>
      </div>

      {/* Bintang */}
      <div className='mt-3 flex gap-0.5'>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={
              i < review.star
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-neutral-300'
            }
          />
        ))}
      </div>

      {/* Komentar */}
      <p className='mt-3 text-sm text-neutral-700'>{review.comment}</p>
    </div>
  );
}
