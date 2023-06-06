export interface IPaymentMethodsResponse {
  id: number;
  installment: number;
  sale_id: number;
  method_id: number;
  createdAt: Date;
  updatedAt: Date;
  method: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
