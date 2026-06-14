'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import { Star, Share2 } from 'lucide-react';
import { useRestaurantDetail } from '@/lib/query/resto';
import { useCart } from '@/lib/query/cart';
import { MenuCard } from '@/components/detail/menu-card';
import { ReviewCard } from '@/components/detail/review-card';
import { CheckoutBar } from '@/components/detail/checkout-bar';
import { Gallery } from '@/components/detail/gallery';

type MenuTab = 'all' | 'food' | 'drink';

export default function RestaurantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const restaurantId = Number(id);

  const { data: resto, isLoading, isError } = useRestaurantDetail(restaurantId);
  const { data: cart } = useCart();

  const [tab, setTab] = useState<MenuTab>('all');
  const [visibleMenus, setVisibleMenus] = useState(8);
  const [visibleReviews, setVisibleReviews] = useState(6);

  if (isLoading) {
    return <p className='py-20 text-center text-neutral-500'>Loading...</p>;
  }
  if (isError || !resto) {
    return (
      <p className='py-20 text-center text-primary'>
        Failed to load restaurant.
      </p>
    );
  }

  const cartItemsHere =
    cart?.cart?.find((group) => group.restaurant.id === restaurantId)?.items ??
    [];
  const findCartItem = (menuId: number) =>
    cartItemsHere.find((it) => it.menu.id === menuId);

  // Filter menu sesuai tab.
  const menus = resto.menus ?? [];
  const filteredMenus =
    tab === 'all' ? menus : menus.filter((m) => m.type === tab);
  const visibleMenuList = filteredMenus.slice(0, visibleMenus);

  const reviews = resto.reviews ?? [];
  const visibleReviewList = reviews.slice(0, visibleReviews);

  const images = resto.images ?? [];

  const tabs: { key: MenuTab; label: string }[] = [
    { key: 'all', label: 'All Menu' },
    { key: 'food', label: 'Food' },
    { key: 'drink', label: 'Drink' },
  ];

  return (
    <div className='pb-28 pt-20'>
      <div className='mx-auto max-w-6xl px-6 py-8'>
        {/* Galeri foto */}
        <Gallery images={images} name={resto.name} />

        {/* Header info */}
        <div className='mt-6 flex items-center justify-between border-b border-neutral-200 pb-6'>
          <div className='flex items-center gap-4'>
            <div className='size-16 overflow-hidden rounded-full bg-neutral-100'>
              {resto.logo && (
                <Image
                  src={resto.logo}
                  alt={resto.name}
                  width={64}
                  height={64}
                  className='size-full object-cover'
                />
              )}
            </div>
            <div>
              <h1 className='text-2xl font-extrabold text-neutral-900'>
                {resto.name}
              </h1>
              <div className='mt-1 flex items-center gap-1'>
                <Star size={16} className='fill-yellow-400 text-yellow-400' />
                <span className='text-sm font-semibold'>{resto.star}</span>
              </div>
              <p className='mt-1 text-sm text-neutral-500'>{resto.place}</p>
            </div>
          </div>
          <button className='flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-2 text-sm font-semibold'>
            <Share2 size={16} /> Share
          </button>
        </div>

        {/* Menu */}
        <section className='mt-8'>
          <h2 className='text-2xl font-extrabold text-neutral-900'>Menu</h2>

          {/* Tab filter */}
          <div className='mt-4 flex gap-3'>
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={
                  'rounded-full border px-5 py-2 text-sm font-semibold transition ' +
                  (tab === t.key
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-neutral-300 text-neutral-700')
                }
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Grid menu */}
          {filteredMenus.length === 0 ? (
            <p className='py-10 text-center text-neutral-500'>
              No menu in this category.
            </p>
          ) : (
            <>
              <div className='mt-6 grid grid-cols-2 gap-4 md:grid-cols-4'>
                {visibleMenuList.map((menu) => (
                  <MenuCard
                    key={menu.id}
                    menu={menu}
                    restaurantId={restaurantId}
                    cartItem={findCartItem(menu.id)}
                  />
                ))}
              </div>
              {visibleMenus < filteredMenus.length && (
                <div className='mt-8 flex justify-center'>
                  <button
                    onClick={() => setVisibleMenus((c) => c + 8)}
                    className='rounded-full border border-neutral-300 px-8 py-2.5 text-sm font-bold hover:bg-neutral-50'
                  >
                    Show More
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {/* Review */}
        <section className='mt-12 border-t border-neutral-200 pt-8'>
          <h2 className='text-2xl font-extrabold text-neutral-900'>Review</h2>
          <div className='mt-2 flex items-center gap-2'>
            <Star size={20} className='fill-yellow-400 text-yellow-400' />
            <span className='font-bold'>
              {resto.star} ({reviews.length} Ulasan)
            </span>
          </div>

          {reviews.length === 0 ? (
            <p className='py-10 text-center text-neutral-500'>
              No reviews yet.
            </p>
          ) : (
            <>
              <div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
                {visibleReviewList.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
              {visibleReviews < reviews.length && (
                <div className='mt-8 flex justify-center'>
                  <button
                    onClick={() => setVisibleReviews((c) => c + 6)}
                    className='rounded-full border border-neutral-300 px-8 py-2.5 text-sm font-bold hover:bg-neutral-50'
                  >
                    Show More
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>

      {/* Floating checkout bar */}
      <CheckoutBar />
    </div>
  );
}
