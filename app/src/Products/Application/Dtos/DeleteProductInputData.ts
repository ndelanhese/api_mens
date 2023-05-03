export default class DeleteProductInputData {
  constructor(
    readonly id: number,
    readonly manufacturer_slug: string,
    readonly type: string,
    readonly part_number: string,
    readonly outlet: boolean,
    readonly description?: string,
    readonly currency?: string,
    readonly contributor_price?: number,
    readonly exempt_price?: number,
    readonly observation?: string,
    readonly disclaimer?: string,
  ) {}
}
