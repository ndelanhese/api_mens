export interface IProductsJson {
  'PART NUMBER': string;
  DESCRIÇÃO: string;
  FABRICANTE: string;
  TIPO: string;
  MOEDA?: string;
  'PREÇO PARA 4% DE ICMS - CONTRIBUINTE': number;
  'PREÇO - ISENTO': string;
  OUTLET?: string;
  OBSERVAÇÕES?: string;
}

export interface IProducts {
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
