export default class UpdateCustomerInputData {
  constructor(
    readonly id: number,
    readonly name?: string,
    readonly cpf?: string,
    readonly birth_date?: Date,
    readonly phone?: string,
    readonly status?: string,
    readonly rg?: string,
  ) {}
}
