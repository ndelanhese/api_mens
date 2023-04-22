import Address from '../../Domain/Entities/Address';

export default class CreateCustomerInputData {
  constructor(
    readonly name: string,
    readonly cpf: string,
    readonly birth_date: Date,
    readonly phone: string,
    readonly status: string,
    readonly address: Address,
    readonly rg?: string,
  ) {}
}
