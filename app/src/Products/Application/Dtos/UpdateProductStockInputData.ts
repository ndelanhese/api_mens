export default class UpdateProductStockInputData {
  constructor(
    readonly quantity: number,
    readonly id: number,
    readonly status?: string,
  ) {}
}
