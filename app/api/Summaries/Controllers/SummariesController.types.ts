export interface IProductSummary {
  id: number;
  name: string;
  description: string | undefined;
  quantity: number;
}

export interface IMethodSummary {
  id: number;
  name: string;
  quantity: number;
}

export interface ICategorySummary {
  id: number;
  name: string;
  quantity: number;
}

export interface IProductsResponse {
  id: number;
  quantity: number;
  discount_amount?: number | null;
  discount_type?: string | null;
  final_value: number;
  sale_id: number;
  product_id?: number;
  createdAt: Date;
  updatedAt: Date;
  product: {
    id: number;
    part_number: string;
    name: string;
    description?: string;
    purchase_price?: number;
    price?: number;
    size?: string;
    color?: string;
    quantity?: number;
    category_id?: number;
    brand_id?: number;
    supplier_id?: number;
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface IPaymentMethodsResponse {
  id: number;
  installment: number;
  sale_id: number;
  method_id: number;
  createdAt: Date;
  updatedAt: Date;
  method: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface IProductsCategoriesResponse {
  id: number;
  product: {
    id: number;
    category: {
      id: number;
      name: string;
    };
  };
}
