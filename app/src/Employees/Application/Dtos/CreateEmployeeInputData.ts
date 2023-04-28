import Address from '../../Domain/Entities/Address';

export default class CreateEmployeeInputData {
  constructor(
    readonly name: string,
    readonly cpf: string,
    readonly birth_date: Date,
    readonly phone: string,
    readonly pis_pasep: string,
    readonly admission_date: Date,
    readonly status: string,
    readonly address: Address,
    readonly rg?: string,
    readonly resignation_date?: Date,
  ) {}
}
