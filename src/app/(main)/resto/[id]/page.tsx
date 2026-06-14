'use client';

import { useParams } from 'next/navigation';

export default function RestoDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold'>Detail Restoran #{id}</h1>
    </div>
  );
}
