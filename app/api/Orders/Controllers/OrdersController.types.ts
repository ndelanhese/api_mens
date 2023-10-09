type Customer = {
  id: number;
  name: string;
  cpf: string;
  rg: string;
  birth_date: string;
  phone: string;
  status: string | null;
  createdAt: string;
  updatedAt: string;
};

type Employee = {
  id: number;
  name: string;
  cpf: string;
  rg: string;
  birth_date: string;
  phone: string;
  pis_pasep: string;
  admission_date: string;
  resignation_date: null | string;
  status: string | null;
  createdAt: string;
  updatedAt: string;
};

type Product = {
  id: number;
  part_number: string;
  name: string;
  description: string;
  purchase_price: number;
  price: number;
  size: string;
  color: string;
  quantity: number;
  status: string | null;
  category_id: number;
  brand_id: number;
  supplier_id: number;
  createdAt: string;
  updatedAt: string;
};

type OrderProduct = {
  id: number;
  quantity: number;
  createdAt: string;
  product: Product;
};

export type Order = {
  id: number;
  date: string;
  observation: string;
  description: string;
  status: string | null;
  createdAt: string;
  customer: Customer;
  employee: Employee;
  orders_products: OrderProduct[];
};
