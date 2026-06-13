import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  getCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
} from '@/lib/api/cart';
import { queryKeys } from './keys';
import type { AddToCartPayload } from '@/Types/cart';

// ===== READ: isi cart =====
export function useCart() {
  return useQuery({
    queryKey: queryKeys.cart.all,
    queryFn: getCart,
  });
}

// ===== WRITE: tambah item =====
export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddToCartPayload) => addToCart(payload),
    onSuccess: () => {
      // Kunci: minta TanStack Query fetch ulang cart.
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
      toast.success('Ditambahkan ke keranjang');
    },
    onError: () => toast.error('Gagal menambah ke keranjang'),
  });
}

// ===== WRITE: ubah quantity =====
export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
      updateCartItem(id, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
    },
    onError: () => toast.error('Gagal memperbarui keranjang'),
  });
}

// ===== WRITE: hapus 1 item =====
export function useDeleteCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteCartItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
      toast.success('Item dihapus');
    },
    onError: () => toast.error('Gagal menghapus item'),
  });
}

// ===== WRITE: kosongkan cart =====
export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
      toast.success('Keranjang dikosongkan');
    },
    onError: () => toast.error('Gagal mengosongkan keranjang'),
  });
}
