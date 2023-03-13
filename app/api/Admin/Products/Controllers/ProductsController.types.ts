export interface IProductsParams {
  order: string;
  direction: string;
  search: string;
  slug: string;
}

export interface IProductsResponse {
  id?: number;
  manufacturer_slug: string;
  type: string;
  part_number: string;
  description: string;
  currency?: string;
  contributor_price: number;
  exempt_price?: number | string;
  note?: string;
  outlet: boolean;
}

export interface IProducts {
  products: IProductsResponse[];
  total: number;
  page: number;
  perPage: number;
}

export interface IProductsPagination {
  products: IProductsResponse[];
  page: number;
  perPage: number;
}

export interface IProductsStockNbcReturn {
  ESTOQUE_LOCAL: string;
  PARTNUMBER: string;
}

export interface IProductsStock {
  stock: string;
  partNumber: string;
}
