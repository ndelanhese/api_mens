export interface IOrderFilter {
  initial_date?: Date;
  final_date?: Date;
  status?: Array<string>;
  customers_id?: Array<number>;
  users_id?: Array<number>;
  products_ids?: Array<number>;
  suppliers_ids?: Array<number>;
}

export interface IOrderExportResponse {
  id: number;
  date: Date;
  observation?: string;
  description?: string;
  status?: string;
  customer_id: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  customer: {
    id: number;
    name: string;
    cpf: string;
    rg?: string;
    birth_date: string;
    phone: string;
  };
  user: {
    id: number;
    employee: {
      id: number;
      name: string;
    };
  };
  orders_products: {
    id: number;
    quantity: number;
    product: {
      id: number;
      part_number: string;
      name: string;
      description: string;
      price: number;
      size?: string;
      color?: string;
      category_id: number;
      brand_id: number;
      supplier_id: number;
    };
  }[];
}
