export interface IProducts {
  manufacturer_slug: string;
  type: string;
  part_number: string;
  description: string;
  currency: string;
  contributor_price: number | undefined;
  exempt_price: number | undefined;
  outlet: boolean;
  observation?: string;
  disclaimer?: string;
}
