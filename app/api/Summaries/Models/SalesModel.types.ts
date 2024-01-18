export interface ISaleFilter {
  initial_date?: Date;
  final_date?: Date;
}

export interface Customer {
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

export interface Employee {
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

interface Method {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
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
  category_id: number;
  brand_id: number;
  supplier_id: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
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

export interface MethodOfPayment {
  id: number;
  installment: number;
  sale_id: number;
  method_id: number;
  createdAt: string;
  updatedAt: string;
  method: Method;
}

export interface SaleProduct {
  id: number;
  quantity: number;
  discount_amount: number | null;
  discount_type: string | null;
  final_value: number;
  sale_id: number;
  product_id: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
}

export interface Sale {
  id: number;
  date: string;
  observation: string | null;
  total_value: number;
  discount_amount: number | null;
  discount_type: string | null;
  final_value: number;
  status: string;
  customer_id: number;
  user_id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  customer: Customer;
  user: User;
  methods_of_payments: MethodOfPayment[];
  sales_products: SaleProduct[];
}

export interface MethodOfPayment {
  id: number;
  name: string;
}
