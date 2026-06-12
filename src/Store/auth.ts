import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;

  setAuth: (token: string, user: User) => void;

  clearToken: () => void;

  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      hasHydrated: false,

      setAuth: (token, user) => set({ token, user }),
      clearToken: () => set({ token: null, user: null }),

      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token, user: state.user }),

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
