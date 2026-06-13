export interface Menu {
  id: number;
  foodName: string;
  price: number;
  type: 'food' | 'drink';
  image: string;
}

// User singkat di dalam review.
export interface ReviewUser {
  id: number;
  name: string;
  avatar?: string | null;
}

export interface Review {
  id: number;
  star: number;
  comment: string;
  createdAt: string;
  user: ReviewUser;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface Coordinates {
  lat: number;
  long: number;
}

// Restoran versi ringkas (untuk Home/list).

export interface Restaurant {
  id: number;
  name: string;
  star: number;
  place: string;
  logo: string;
  images: string[];
  category: string;
  reviewCount: number;
  menuCount: number;
  priceRange: PriceRange;
  distance?: number;
}

export interface RestaurantDetail {
  id: number;
  name: string;
  star: number;
  averageRating?: number;
  place: string;
  logo: string;
  images: string[];
  category: string;
  coordinates?: Coordinates;
  totalMenus: number;
  totalReviews: number;
  menus: Menu[];
  reviews: Review[];
}

// Parameter filter untuk GET /api/resto.
export interface RestoFilterParams {
  location?: string;
  range?: number;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  category?: string;
  page?: number;
  limit?: number;
}
