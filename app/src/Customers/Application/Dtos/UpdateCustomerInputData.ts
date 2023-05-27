export default class UpdateCustomerInputData {
  constructor(
    readonly id: number,
    readonly name?: string,
    readonly cpf?: string,
    readonly birth_date?: Date,
    readonly phone?: string,
    readonly status?: string,
    readonly rg?: string,
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
