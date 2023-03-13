export interface IProductsParams {
  order: string;
  direction: string;
  search: string;
  slug: string;
}

export interface IProductsTypes {
  data: {
    type: string;
  }[];
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
    note: string;
    outlet: boolean;
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
  exempt_price: number;
  note: string;
  outlet: boolean;
}
