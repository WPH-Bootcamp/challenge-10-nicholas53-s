import { api } from './axios';
import type {
  CheckoutPayload,
  Order,
  OrderFilterParams,
  CreateReviewPayload,
} from '@/Types/order';

// POST /api/order/checkout — buat pesanan dari isi cart.
export async function checkout(payload: CheckoutPayload) {
  const { data } = await api.post('/order/checkout', payload);
  return data;
}

// GET /api/order/my-order — history pesanan user.
export async function getMyOrders(
  params?: OrderFilterParams
): Promise<Order[]> {
  const { data } = await api.get('/order/my-order', { params });

  return data.data?.orders ?? data.data ?? [];
}

// POST /api/review — kirim review (bonus, utk pesanan selesai).
export async function createReview(payload: CreateReviewPayload) {
  const { data } = await api.post('/review', payload);
  return data;
}
