import { api } from './axios';
import type { Cart, AddToCartPayload } from '@/Types/cart';

// GET /api/cart — ambil isi cart (dikelompokkan per restoran).
export async function getCart(): Promise<Cart> {
  const { data } = await api.get('/cart');

  return data.data ?? data;
}

// POST /api/cart — tambah item ke cart.
export async function addToCart(payload: AddToCartPayload) {
  const { data } = await api.post('/cart', payload);
  return data;
}

// PUT /api/cart/{id} — ubah quantity 1 item.
export async function updateCartItem(id: number, quantity: number) {
  const { data } = await api.put(`/cart/${id}`, { quantity });
  return data;
}

// DELETE /api/cart/{id} — hapus 1 item.
export async function deleteCartItem(id: number) {
  const { data } = await api.delete(`/cart/${id}`);
  return data;
}

// DELETE /api/cart — kosongkan seluruh cart.
export async function clearCart() {
  const { data } = await api.delete('/cart');
  return data;
}
