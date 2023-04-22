import Address from '../../Domain/Entities/Address';

export default class UpdateUserInputData {
  constructor(
    readonly name?: string,
    readonly cpf?: string,
    readonly birth_date?: Date,
    readonly phone?: string,
    readonly status?: string,
    readonly address?: Address,
    readonly rg?: string,
    readonly id?: number,
  ) {}
}
