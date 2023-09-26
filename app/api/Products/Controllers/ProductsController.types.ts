interface Category {
  id: number;
  name: string;
}

interface Brand {
  id: number;
  name: string;
}

interface Supplier {
  id: number;
  contact_name: string;
  corporate_name: string;
  cnpj: string;
}

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
  createdAt: string;
  updatedAt: string;
  category: Category;
  brand: Brand;
  supplier: Supplier;
}
