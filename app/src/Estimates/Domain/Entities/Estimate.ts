export default class Estimate {
  private id?: number;
  private name: string;
  private email: string;
  private phone: string;
  private corporate_name?: string;
  private cnpj?: string;
  private address?: string;
  private state?: string;
  private postal_code?: string;
  private district?: string;
  private city?: string;

  constructor(
    name: string,
    email: string,
    phone: string,
    corporate_name?: string,
    cnpj?: string,
    address?: string,
    state?: string,
    postal_code?: string,
    district?: string,
    city?: string,
    id?: number,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.corporate_name = corporate_name;
    this.cnpj = cnpj;
    this.address = address;
    this.state = state;
    this.postal_code = postal_code;
    this.district = district;
    this.city = city;
  }

  public getId() {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
    return this;
  }

  public getName() {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
    return this;
  }

  public getEmail() {
    return this.email;
  }

  public setEmail(email: string) {
    this.email = email;
    return this;
  }

  public getPhone() {
    return this.phone;
  }

  public setPhone(phone: string) {
    this.phone = phone;
    return this;
  }

  public getCorporateName() {
    return this.corporate_name;
  }

  public setCorporateName(corporateName: string) {
    this.corporate_name = corporateName;
    return this;
  }

  public getCnpj() {
    return this.cnpj;
  }

  public setCnpj(cnpj: string) {
    this.cnpj = cnpj;
    return this;
  }

  public getAddress() {
    return this.address;
  }

  public setAddress(address: string) {
    this.address = address;
    return this;
  }

  public getState() {
    return this.state;
  }

  public setState(state: string) {
    this.state = state;
    return this;
  }

  public getPostalCode() {
    return this.postal_code;
  }

  public setPostalCode(postalCode: string) {
    this.postal_code = postalCode;
    return this;
  }

  public getDistrict() {
    return this.district;
  }

  public setDistrict(district: string) {
    this.district = district;
    return this;
  }

  public getCity() {
    return this.city;
  }

  public setCity(city: string) {
    this.city = city;
    return this;
  }
}
