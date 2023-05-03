export interface IProductModel {
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

export interface IProductPayload {
  id?: number;
  manufacturer_slug: string;
  type: string;
  part_number: string;
  description: string;
  currency: string;
  contributor_price?: number;
  exempt_price?: number;
  outlet: boolean;
  observation?: string;
  disclaimer?: string;
}
