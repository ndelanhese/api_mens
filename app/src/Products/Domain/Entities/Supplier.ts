export default class Supplier {
  private id?: number;
  private contact_name: string;
  private corporate_name: string;
  private cnpj: string;
  private status: string;

  constructor(
    contact_name: string,
    corporate_name: string,
    cnpj: string,
    status: string,
    id?: number,
  ) {
    this.id = id;
    this.contact_name = contact_name;
    this.corporate_name = corporate_name;
    this.cnpj = cnpj;
    this.status = status;
  }

  public getId() {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
    return this;
  }

  public getContactName(): string {
    return this.contact_name;
  }

  public setContactName(contact_name: string) {
    this.contact_name = contact_name;
    return this;
  }

  public getCorporateName(): string {
    return this.corporate_name;
  }

  public setCorporateName(corporate_name: string) {
    this.corporate_name = corporate_name;
    return this;
  }

  public getCnpj(): string {
    return this.cnpj;
  }

  public setCnpj(cnpj: string) {
    this.cnpj = cnpj;
    return this;
  }

  public getStatus(): string {
    return this.status;
  }

  public setStatus(status: string) {
    this.status = status;
    return this;
  }
}
