import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { checkout, getMyOrders, createReview } from '@/lib/api/order';
import { useLastOrderStore } from '@/Store/last-order';
import { queryKeys } from './keys';
import type {
  CheckoutPayload,
  OrderFilterParams,
  CreateReviewPayload,
} from '@/Types/order';

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
    mutationFn: (payload: CheckoutPayload) => checkout(payload),
    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.order.all });
      // Simpan order baru → ditampilkan di halaman Success.
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
