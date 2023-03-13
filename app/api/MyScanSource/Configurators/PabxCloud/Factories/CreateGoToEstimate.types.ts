export interface IEstimatePayload {
  agent: {
    company_name: string;
    cnpj: string;
    name: string;
    email: string;
    phone: string;
  };
  customer: {
    company_name: string;
    cnpj: string;
  };
  portability: null | {
    phone_numbers: string[];
  };
  observation: string;
  products: IEstimateProduct[];
}
export interface IEstimateProduct {
  form_id: number;
  quantity: number;
  price: number;
  optional: {
    line: {
      form_id: number;
      number: number;
      quantity: number;
      price: number;
    };
    integration?: {
      form_id: number;
      quantity: number;
      price: number;
    };
  };
}

export interface IProductFieldsRpmPattern {
  Fields: { Uid: string; Values: IProductFieldValues[] }[];
}

interface IProductFieldValues {
  ID?: number;
  Value?: number | string;
}

export interface IProductFormRpmPattern {
  Fields: IProductFieldsRpmPattern[];
}

export interface IPayloadRpmPattern {
  ProcessID: string;
  Form: {
    Fields: (
      | {
          Field: string;
          Value: string;
          ID?: undefined;
          Rows?: any;
        }
      | {
          Field: string;
          Value: string;
          ID: string;
          Rows?: any;
        }
      | {
          Field: string;
          Value?: any;
          ID?: any;
          Rows: {
            Fields: {
              Uid: string;
              Values: {
                ID?: number;
                Value?: number | string;
              }[];
            }[];
          }[];
        }
    )[];
  };
}
