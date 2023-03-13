export default class DeleteProductInputData {
  constructor(
    readonly id: number,
    readonly manufacturer_slug: string,
    readonly type: string,
    readonly part_number: string,
    readonly description: string,
    readonly currency: string,
    readonly contributor_price: number,
    readonly outlet: boolean,
    readonly exempt_price?: number,
    readonly note?: string,
  ) {}
}
