export interface RpmProductsResponse {
  FormID: number;
  Values: string[];
}

export interface ProductsThatHaveTheOptionals {
  integration: string[];
  lines: string[];
  integrationPosition: number;
  linesPosition: number;
}

export interface ProductInterface {
  form_id: number;
  number: number;
  part_number: string;
  name: string;
  price: number;
  description: string;
  min: number;
  max: number;
  type: string;
  optional: {
    line: null | OptionalLine;
    integration: null | OptionalIntegration;
  };
}

interface OptionalLine {
  form_id: number;
  number: number;
  part_number: string;
  name: string;
  price: number;
  quantity_free: number;
}
interface OptionalIntegration {
  form_id: number;
  number: number;
  part_number: string;
  name: string;
  price: number;
}
