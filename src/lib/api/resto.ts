import { api } from './axios';
import type {
  Restaurant,
  RestaurantDetail,
  RestoFilterParams,
} from '@/Types/resto';

export async function getRestaurants(
  params?: RestoFilterParams
): Promise<Restaurant[]> {
  const { data } = await api.get('/resto', { params });

  return data.data?.restaurants ?? data.data ?? [];
}

// GET /api/resto/{id} — detail restoran + menu + review.
export async function getRestaurantById(
  id: number,
  opts?: { limitMenu?: number; limitReview?: number }
): Promise<RestaurantDetail> {
  const { data } = await api.get(`/resto/${id}`, { params: opts });
  return data.data ?? data;
}

// GET /api/resto/search — cari restoran by nama.
export async function searchRestaurants(
  q: string,
  params?: { page?: number; limit?: number }
): Promise<Restaurant[]> {
  const { data } = await api.get('/resto/search', {
    params: { q, ...params },
  });
  return data.data?.restaurants ?? data.data ?? [];
}

// GET /api/resto/best-seller — urut rating tertinggi.
export async function getBestSellerRestaurants(params?: {
  page?: number;
  limit?: number;
}): Promise<Restaurant[]> {
  const { data } = await api.get('/resto/best-seller', { params });
  return data.data?.restaurants ?? data.data ?? [];
}

// GET /api/resto/recommended (auth) — rekomendasi utk user login.
export async function getRecommendedRestaurants(): Promise<Restaurant[]> {
  const { data } = await api.get('/resto/recommended');
  return data.data?.restaurants ?? data.data ?? [];
}
