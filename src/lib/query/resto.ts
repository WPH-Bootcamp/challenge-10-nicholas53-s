import { useQuery } from '@tanstack/react-query';
import {
  getRestaurants,
  getRestaurantById,
  searchRestaurants,
  getBestSellerRestaurants,
  getRecommendedRestaurants,
} from '@/lib/api/resto';
import { queryKeys } from './keys';
import type { RestoFilterParams } from '@/Types/resto';

// Daftar restoran (dengan filter opsional).
export function useRestaurants(params?: RestoFilterParams) {
  return useQuery({
    queryKey: queryKeys.resto.list(params),
    queryFn: () => getRestaurants(params),
  });
}

// Detail satu restoran. `enabled` mencegah fetch saat id belum siap.
export function useRestaurantDetail(
  id: number,
  opts?: { limitMenu?: number; limitReview?: number }
) {
  return useQuery({
    queryKey: queryKeys.resto.detail(id),
    queryFn: () => getRestaurantById(id, opts),
    enabled: !!id, // jangan fetch kalau id falsy (0/undefined)
  });
}

// Pencarian restoran by nama.
export function useSearchRestaurants(q: string) {
  return useQuery({
    queryKey: queryKeys.resto.search(q),
    queryFn: () => searchRestaurants(q),
    enabled: q.trim().length > 0,
  });
}

// Best seller.
export function useBestSellers() {
  return useQuery({
    queryKey: queryKeys.resto.bestSeller,
    queryFn: () => getBestSellerRestaurants(),
  });
}

// Recommended (butuh login).
export function useRecommended() {
  return useQuery({
    queryKey: queryKeys.resto.recommended,
    queryFn: () => getRecommendedRestaurants(),
  });
}
