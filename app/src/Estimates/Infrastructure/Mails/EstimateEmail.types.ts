export interface emailData {
  name: string;
  email: string;
  phone: string;
  corporateName: string;
  uf: string;
  cnpj: string;
  products: {
    partNumber: string;
    description: string;
    qtd: number;
    exemptPrice: number;
    currency: string;
  }[];
}

export interface productData {
  partNumber: string;
  description: string;
  qtd: number;
  exemptPrice: number;
  currency: string;
}
