export interface IProductsParams {
  order: string;
  direction: string;
  search: string;
  slug: string;
}

export interface IProductsResponse {
  data: {
    id: number;
    manufacturer_slug: string;
    type: string;
    part_number: string;
    description: string;
    currency: string;
    contributor_price: number;
    exempt_price: number;
    outlet: boolean;
    observation?: string;
    disclaimer?: string;
  }[];
}

export interface IProductResponse {
  id: number;
  manufacturer_slug: string;
  type: string;
  part_number: string;
  description: string;
  currency: string;
  contributor_price: number;
  exempt_price?: number;
  outlet: boolean;
  observation?: string;
  disclaimer?: string;
}
