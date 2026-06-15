import Image from 'next/image';

const socials = [
  { name: 'Facebook', icon: '/facebook.png' },
  { name: 'Instagram', icon: '/instagram.png' },
  { name: 'LinkedIn', icon: '/linkedin.png' },
  { name: 'TikTok', icon: '/tiktok.png' },
];

export function Footer() {
  return (
    <footer className='bg-neutral-950 text-neutral-100'>
      <div className='mx-auto max-w-6xl px-6 py-12'>
        <div className='flex flex-col gap-10 md:flex-row md:justify-between'>
          {/* Kolom 1: logo + deskripsi + sosmed */}
          <div className='max-w-sm space-y-4 mb-5.5'>
            <div className='flex items-center gap-2'>
              <Image
                src='/foody-group.png'
                alt='Foody'
                width={42}
                height={42}
              />
              <span className='text-xl font-extrabold text-[32px]'>Foody</span>
            </div>
            <p className='text-sm text-neutral-25'>
              Enjoy homemade flavors &amp; chef&apos;s signature dishes, freshly
              prepared every day. Order online or visit our nearest branch.
            </p>
            <div>
              <p className='mb-4 text-sm font-bold mt-5'>
                Follow on Social Media
              </p>
              <div className='flex gap-3'>
                {socials.map((s) => (
                  <span
                    key={s.name}
                    title={s.name}
                    className='flex size-10 items-center justify-center rounded-full border border-neutral-700'
                  >
                    <Image src={s.icon} alt={s.name} width={18} height={18} />
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-12 md:contents'>
            {/* Kolom 2: Explore */}
            <div>
              <h4 className='mb-4 font-bold'>Explore</h4>
              <ul className='space-y-3 text-sm text-neutral-25 mb-4 '>
                <li>All Food</li>
                <li>Nearby</li>
                <li>Discount</li>
                <li>Best Seller</li>
                <li>Delivery</li>
                <li>Lunch</li>
              </ul>
            </div>

            {/* Kolom 3: Help */}
            <div>
              <h4 className='mb-4 font-bold'>Help</h4>
              <ul className='space-y-3 text-sm text-neutral-25 mb-4 '>
                <li>How to Order</li>
                <li>Payment Methods</li>
                <li>Track My Order</li>
                <li>FAQ</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
