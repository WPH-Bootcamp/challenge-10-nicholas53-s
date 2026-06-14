// src/components/home/categories.tsx
import Image from 'next/image';

const categories = [
  { name: 'All Restaurant', icon: '/All-Food.png' },
  { name: 'Nearby', icon: '/nearby.png' },
  { name: 'Discount', icon: '/Discount.png' },
  { name: 'Best Seller', icon: '/best-seller.png' },
  { name: 'Delivery', icon: '/Delivery.png' },
  { name: 'Lunch', icon: '/lunch.png' },
];

export function Categories() {
  return (
    <section className='mx-auto max-w-6xl px-6 py-10'>
      <div className='grid grid-cols-3 gap-4 md:grid-cols-6'>
        {categories.map((cat) => (
          <div key={cat.name} className='flex flex-col items-center gap-3'>
            {/* Kotak putih membulat berisi ikon */}
            <div className='flex aspect-square w-full max-w-[120px] items-center justify-center rounded-2xl bg-white shadow-sm'>
              <Image
                src={cat.icon}
                alt={cat.name}
                width={56}
                height={56}
                className='object-contain'
              />
            </div>

            <span className='text-center text-sm font-semibold text-neutral-900'>
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
