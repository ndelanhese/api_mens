export default class CreateProductInputData {
  constructor(
    readonly manufacturer_slug: string,
    readonly type: string,
    readonly part_number: string,
    readonly description: string,
    readonly currency: string = 'R$',
    readonly outlet: boolean,
    readonly contributor_price?: number,
    readonly exempt_price?: number,
    readonly observation?: string,
    readonly disclaimer?: string,
  ) {}
}
