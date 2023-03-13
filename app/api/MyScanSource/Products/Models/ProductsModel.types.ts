export interface IManufacturers {
  manufacturer_slug: string;
}

export interface IProductsType {
  type: string;
}

export interface IProductsParams {
  order: string;
  direction: string;
  partNumber: string;
  description: string;
  manufacturer: string;
  type: string;
}

export interface IProducts {
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
