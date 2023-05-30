export default class UpdateEmployeeInputData {
  constructor(
    readonly id: number,
    readonly name?: string,
    readonly cpf?: string,
    readonly birth_date?: Date,
    readonly phone?: string,
    readonly pis_pasep?: string,
    readonly admission_date?: Date,
    readonly status?: string,
    readonly rg?: string,
    readonly resignation_date?: Date,
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
