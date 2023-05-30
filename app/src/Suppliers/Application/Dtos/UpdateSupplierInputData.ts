export default class UpdateSupplierInputData {
  constructor(
    readonly id: number,
    readonly contact_name?: string,
    readonly corporate_name?: string,
    readonly cnpj?: string,
    readonly status?: string,
    readonly address?: {
      readonly id: number;
      readonly address: string;
      readonly number: string;
      readonly district: string;
      readonly postal_code: string;
      readonly city: string;
      readonly state: string;
    },
  ) {}
}
