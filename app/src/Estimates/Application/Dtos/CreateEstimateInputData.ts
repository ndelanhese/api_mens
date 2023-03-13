export default class CreateEstimateInputData {
  constructor(
    readonly name: string,
    readonly email: string,
    readonly phone: string,
    readonly products: { product_id: number; qtd: number }[],
    readonly corporate_name?: string,
    readonly cnpj?: string,
    readonly address?: string,
    readonly state?: string,
    readonly postal_code?: string,
    readonly district?: string,
    readonly city?: string,
  ) {}
}
