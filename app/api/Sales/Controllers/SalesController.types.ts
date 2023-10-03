interface MethodOfPayment {
  id: number;
  installment: number;
  method: {
    id: number;
    name: string;
  };
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
}

interface Customer {
  id: number;
  name: string;
  cpf: string;
  rg: string;
  birth_date: string;
  phone: string;
}

interface Employee {
  id: number;
  name: string;
  cpf: string;
}

export interface Sale {
  id: number;
  date: string;
  observation: null | string;
  total_value: number;
  discount_amount: null | number;
  discount_type: null | string;
  final_value: number;
  status: string;
  createdAt: string;
  customer: Customer;
  employee: Employee;
  methods_of_payments: MethodOfPayment[];
  products: Product[];
}
