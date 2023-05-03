export default class UpdateProductInputData {
  constructor(
    readonly part_number?: string,
    readonly name?: string,
    readonly description?: string,
    readonly price?: number,
    readonly quantity?: number,
    readonly category_id?: number,
    readonly brand_id?: number,
    readonly supplier_id?: number,
    readonly purchase_price?: number,
    readonly size?: string,
    readonly color?: string,
  ) {}
}
