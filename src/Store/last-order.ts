import { create } from 'zustand';
import type { Order } from '@/Types/order';

interface LastOrderState {
  lastOrder: Order | null;
  setLastOrder: (order: Order) => void;
  clearLastOrder: () => void;
}

export const useLastOrderStore = create<LastOrderState>((set) => ({
  lastOrder: null,
  setLastOrder: (order) => set({ lastOrder: order }),
  clearLastOrder: () => set({ lastOrder: null }),
}));
