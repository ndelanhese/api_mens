export interface Product {
  id: number;
  part_number: string;
  name: string;
  description: string;
  purchase_price: number;
  price: number;
  size: string;
  color: string;
  quantity: number;
  status: string;
  category_id: number;
  brand_id: number;
  supplier_id: number;
  createdAt: string;
  updatedAt: string;
}

interface ProductItem {
  id: number;
  promotion_id: number;
  product_id: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
}

interface PromotionCategory {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Promotion {
  id: number;
  name: string;
  description: string;
  discount_amount: number;
  discount_type: string;
  initial_date: string;
  final_date: string;
  status: string;
  promotion_category_id: number;
  createdAt: string;
  updatedAt: string;
  category: PromotionCategory;
  products: ProductItem[];
}
