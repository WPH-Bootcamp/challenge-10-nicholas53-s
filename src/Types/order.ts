import type { CartRestaurant } from './cart';

export interface OrderItem {
  menuId: number;
  menuName: string;
  price: number;
  image: string;
  quantity: number;
  itemTotal: number;
}

export interface OrderRestaurantGroup {
  restaurant: CartRestaurant;
  items: OrderItem[];
  subtotal: number;
}

// Rincian biaya order.
export interface OrderPricing {
  subtotal: number;
  serviceFee: number;
  deliveryFee: number;
  totalPrice: number;
}

// Status pesanan.

export type OrderStatus =
  | 'pending'
  | 'preparing'
  | 'on_the_way'
  | 'delivered'
  | 'done'
  | 'cancelled';

export interface Order {
  id: number;
  transactionId: string;
  status: OrderStatus;
  paymentMethod: string;
  deliveryAddress: string;
  phone?: string;
  pricing: OrderPricing;
  restaurants: OrderRestaurantGroup[];
  createdAt: string;
  updatedAt: string;
}

// Parameter query untuk my-order.
export interface OrderFilterParams {
  status?: OrderStatus;
  page?: number;
  limit?: number;
}

// ===== CHECKOUT (POST /api/order/checkout) =====

export interface CheckoutItem {
  menuId: number;
  quantity: number;
}

export interface CheckoutRestaurant {
  restaurantId: number;
  items: CheckoutItem[];
}

export interface CheckoutPayload {
  restaurants: CheckoutRestaurant[];
  deliveryAddress: string;
  phone?: string;
  paymentMethod: string;
  notes?: string;
}

// ===== REVIEW (POST /api/review) =====
export interface CreateReviewPayload {
  transactionId: string;
  restaurantId: number;
  star: number;
  comment: string;
  menuIds?: number[];
}
