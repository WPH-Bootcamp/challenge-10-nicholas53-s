'use client';

import Image from 'next/image';

export function Gallery({ images, name }: { images: string[]; name: string }) {
  if (images.length === 0) return null;

  const [img1, img2, img3, img4] = images;

  return (
    <>
      {/* ===== MOBILE: carousel geser ===== */}
      <div className='md:hidden'>
        <div className='flex snap-x snap-mandatory gap-3 overflow-x-auto rounded-2xl'>
          {images.map((img, i) => (
            <div
              key={i}
              className='relative aspect-[4/3] w-full shrink-0 snap-center overflow-hidden rounded-2xl bg-neutral-100'
            >
              <Image
                src={img}
                alt={`${name} ${i + 1}`}
                fill
                className='object-cover'
              />
            </div>
          ))}
        </div>
      </div>

      {/* ===== DESKTOP: grid ===== */}
      <div className='hidden gap-3 md:grid md:grid-cols-2'>
        {/* Kiri: 1 foto besar (tinggi penuh) */}
        <div className='relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100'>
          {img1 && (
            <Image src={img1} alt={name} fill className='object-cover' />
          )}
        </div>

        {/* Kanan: 1 lebar atas + 2 kecil bawah */}
        <div className='grid grid-rows-2 gap-3'>
          {/* Atas: 1 foto lebar */}
          <div className='relative overflow-hidden rounded-2xl bg-neutral-100'>
            {img2 && (
              <Image
                src={img2}
                alt={`${name} 2`}
                fill
                className='object-cover'
              />
            )}
          </div>
          {/* Bawah: 2 foto kecil */}
          <div className='grid grid-cols-2 gap-3'>
            <div className='relative overflow-hidden rounded-2xl bg-neutral-100'>
              {img3 && (
                <Image
                  src={img3}
                  alt={`${name} 3`}
                  fill
                  className='object-cover'
                />
              )}
            </div>
            <div className='relative overflow-hidden rounded-2xl bg-neutral-100'>
              {img4 && (
                <Image
                  src={img4}
                  alt={`${name} 4`}
                  fill
                  className='object-cover'
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
