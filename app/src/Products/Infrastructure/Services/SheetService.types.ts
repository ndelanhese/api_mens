export interface IProductsJson {
  'PART NUMBER': string;
  NOME: string;
  DESCRIÇÃO: string;
  'PREÇO DE ORIGEM'?: number;
  PREÇO: number;
  TAMANHO?: string;
  COR?: string;
  QUANTIDADE: number;
  CATEGORIA: string;
  MARCA: string;
  FORNECEDOR: string;
}

export interface IProducts {
  part_number: string;
  name: string;
  description: string;
  purchase_price?: number;
  price: number;
  size?: string;
  color?: string;
  quantity: number;
  category: string;
  brand: string;
  supplier: string;
}

export interface ISheetProducts {
  products: Array<IProducts>;
  errors: Array<IColumnError>;
}

export interface IColumnError {
  line: number;
  column: string;
  message: string;
}
