import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { checkout, getMyOrders, createReview } from '@/lib/api/order';
import { getCart, deleteCartItem, clearCart } from '@/lib/api/cart';
import { useLastOrderStore } from '@/store/last-order';
import { queryKeys } from './keys';
import type {
  CheckoutPayload,
  OrderFilterParams,
  CreateReviewPayload,
} from '@/types/order';

// ===== READ: history pesanan =====
export function useMyOrders(params?: OrderFilterParams) {
  return useQuery({
    queryKey: queryKeys.order.myOrders(params),
    queryFn: () => getMyOrders(params),
  });
}

// ===== WRITE: checkout =====
export function useCheckout() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setLastOrder = useLastOrderStore((s) => s.setLastOrder);

  return useMutation({
    mutationFn: async (payload: CheckoutPayload) => {
      // 1. Buat order
      const order = await checkout(payload);

      // 2. Kosongkan cart. Coba clear-all dulu; lalu pastikan dengan
      //    menghapus sisa item satu per satu (karena DELETE /cart
      //    ternyata tidak selalu mengosongkan di server).
      try {
        await clearCart();
      } catch {
        // abaikan, lanjut hapus per item
      }

      const cart = await getCart();
      const remainingIds = cart.cart.flatMap((group) =>
        group.items.map((item) => item.id)
      );
      await Promise.all(remainingIds.map((id) => deleteCartItem(id)));

      return order;
    },
    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.order.all });
      setLastOrder(order);
      router.push('/success');
    },
    onError: () => toast.error('Checkout gagal, coba lagi'),
  });
}

// ===== WRITE: kirim review (bonus) =====
export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateReviewPayload) => createReview(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.order.all });
      toast.success('Ulasan terkirim');
    },
    onError: () => toast.error('Gagal mengirim ulasan'),
  });
}
