export interface IOrderFilter {
  initial_date?: Date;
  final_date?: Date;
  status?: Array<string>;
  customers_id?: Array<number>;
  users_id?: Array<number>;
}

interface Customer {
  id: number;
  name: string;
  cpf: string;
  rg: string;
  birth_date: string;
  phone: string;
  status: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Employee {
  id: number;
  name: string;
  cpf: string;
  rg: string;
  birth_date: string;
  phone: string;
  pis_pasep: string;
  admission_date: string;
  resignation_date: string | null;
  status: string | null;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: number;
  user: string;
  email: string;
  status: string;
  employee_id: number;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  employee: Employee;
}

interface Product {
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

interface OrderProduct {
  id: number;
  quantity: number;
  order_id: number;
  product_id: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
}

export interface Order {
  id: number;
  date: string;
  description: string;
  observation: string;
  status: string;
  customer_id: number;
  user_id: number;
  createdAt: string;
  updatedAt: string;
  customer: Customer;
  user: User;
  orders_products: OrderProduct[];
}
