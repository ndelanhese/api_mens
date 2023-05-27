export default class UpdateAddressInputData {
  constructor(
    readonly id: number,
    readonly address?: string,
    readonly number?: string,
    readonly district?: string,
    readonly postal_code?: string,
    readonly city?: string,
    readonly state?: string,
  ) {}
}
