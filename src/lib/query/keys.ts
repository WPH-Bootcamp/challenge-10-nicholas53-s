import type { RestoFilterParams } from '@/Types/resto';
import type { OrderFilterParams } from '@/Types/order';

export const queryKeys = {
  // ===== RESTO =====
  resto: {
    all: ['resto'] as const,
    list: (params?: RestoFilterParams) => ['resto', 'list', params] as const,
    detail: (id: number) => ['resto', 'detail', id] as const,
    search: (q: string) => ['resto', 'search', q] as const,
    bestSeller: ['resto', 'best-seller'] as const,
    recommended: ['resto', 'recommended'] as const,
  },

  // ===== CART =====
  cart: {
    all: ['cart'] as const,
  },

  // ===== ORDER =====
  order: {
    all: ['order'] as const,
    myOrders: (params?: OrderFilterParams) =>
      ['order', 'my-order', params] as const,
  },
};
