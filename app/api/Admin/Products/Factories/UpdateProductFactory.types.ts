export interface IProduct {
  manufacturer_slug: string;
  type: string;
  part_number: string;
  description: string;
  currency: string;
  contributor_price: number;
  exempt_price: number;
  note: string;
  outlet: boolean;
  id: number;
}
