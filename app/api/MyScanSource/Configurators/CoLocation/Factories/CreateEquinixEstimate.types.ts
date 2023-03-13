export interface IEstimatePayload {
  agent: {
    company_name: string;
    cnpj: string;
    name: string;
    email: string;
    phone: string;
  };
  duration: number;
  observations: string;
  products: IEstimateProduct[];
}
export interface IEstimateProduct {
  form_id: number;
  quantity: number;
  price: number;
  install_price: number;
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
          Value: string | number;
          ID?: undefined;
          Rows?: any;
        }
      | {
          Field: string;
          Value: string | number;
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
