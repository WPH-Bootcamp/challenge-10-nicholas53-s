import type { Menu } from './resto';

export interface CartRestaurant {
  id: number;
  name: string;
  logo: string;
}

export interface CartItem {
  id: number;
  menu: Menu;
  quantity: number;
  itemTotal: number;
}

// Satu kelompok cart
export interface CartGroup {
  restaurant: CartRestaurant;
  items: CartItem[];
  subtotal: number;
}

export interface CartSummary {
  totalItems: number;
  totalPrice: number;
  restaurantCount: number;
}

// Bentuk keseluruhan isi cart dari GET /api/cart.
export interface Cart {
  cart: CartGroup[];
  summary: CartSummary;
}

// Payload untuk POST /api/cart
export interface AddToCartPayload {
  restaurantId: number;
  menuId: number;
  quantity: number;
}
