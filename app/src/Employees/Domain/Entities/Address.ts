export default class Address {
  private id?: number;
  private address: string;
  private number: string;
  private district: string;
  private postal_code: string;
  private city: string;
  private state: string;

  constructor(
    address: string,
    number: string,
    district: string,
    postal_code: string,
    city: string,
    state: string,
    id?: number,
  ) {
    this.id = id;
    this.address = address;
    this.number = number;
    this.district = district;
    this.postal_code = postal_code;
    this.city = city;
    this.state = state;
  }

  public getId() {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
    return this;
  }

  public getAddress(): string {
    return this.address;
  }

  public setAddress(address: string) {
    this.address = address;
    return this;
  }

  public getNumber(): string {
    return this.number;
  }

  public setNumber(number: string) {
    this.number = number;
    return this;
  }

  public getDistrict(): string {
    return this.district;
  }

  public setDistrict(district: string) {
    this.district = district;
    return this;
  }

  public getPostalCode(): string {
    return this.postal_code;
  }

  public setPostalCode(postal_code: string) {
    this.postal_code = postal_code;
    return this;
  }

  public getCity(): string {
    return this.city;
  }

  public setCity(city: string) {
    this.city = city;
    return this;
  }

  public getState(): string {
    return this.state;
  }

  public setState(state: string) {
    this.state = state;
    return this;
  }
}
