export interface IEstimate {
  id: number;
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
  products: {
    qtd: number;
    product: {
      manufacturer_slug: string;
      part_number: string;
      currency: string;
      description: string;
      exempt_price: number;
    };
  }[];
}
