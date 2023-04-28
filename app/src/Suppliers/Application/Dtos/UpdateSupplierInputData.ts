export default class UpdateSupplierInputData {
  constructor(
    readonly id: number,
    readonly contact_name?: string,
    readonly corporate_name?: string,
    readonly cnpj?: string,
    readonly status?: string,
  ) {}
}
