import Address from '../../Domain/Entities/Address';

export default class CreateSupplierInputData {
  constructor(
    readonly contact_name: string,
    readonly corporate_name: string,
    readonly cnpj: string,
    readonly status: string,
    readonly address: Address,
  ) {}
}
