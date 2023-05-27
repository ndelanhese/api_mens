export default class CreateAddressInputData {
  constructor(
    readonly address: string,
    readonly number: string,
    readonly district: string,
    readonly postal_code: string,
    readonly city: string,
    readonly state: string,
  ) {}
}
