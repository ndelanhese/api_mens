export interface IEstimate {
  id?: number;
  name: string;
  email: string;
  phone: string;
  corporate_name?: string;
  cnpj?: string;
  address?: string;
  state?: string;
  postal_code?: string;
  district?: string;
  city?: string;
  products?: {
    product_id: string;
    qtd: number;
  }[];
}
