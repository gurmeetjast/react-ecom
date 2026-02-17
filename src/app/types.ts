export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'men' | 'women';
  subcategory: string;
  description: string;
  fabric: string;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  rating: number;
  reviews: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}
