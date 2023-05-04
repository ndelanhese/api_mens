export interface IProductModel {
  id: number;
  part_number: string;
  name: string;
  description: string;
  purchase_price?: number;
  price: number;
  size?: string;
  color?: string;
  quantity: number;
  category_id: number;
  brand_id: number;
  supplier_id: number;
}

export interface IProductPayload {
  id?: number;
  part_number?: string;
  name: string;
  description: string;
  purchase_price?: number;
  price: number;
  size?: string;
  color?: string;
  quantity: number;
  category_id: number;
  brand_id: number;
  supplier_id: number;
}
