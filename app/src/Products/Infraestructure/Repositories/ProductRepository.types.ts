export interface IProducts {
  manufacturer_slug: string;
  type: string;
  part_number: string;
  description: string;
  currency: string;
  contributor_price: number;
  exempt_price: number | undefined;
  note: string | undefined;
  outlet: boolean;
}
