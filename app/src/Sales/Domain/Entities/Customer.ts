export default class Customer {
  private id?: number;
  private name: string;
  private cpf: string;
  private rg?: string;
  private birth_date: Date;
  private phone: string;
  private status: string;

  constructor(
    name: string,
    cpf: string,
    birth_date: Date,
    phone: string,
    status: string,
    rg?: string,
    id?: number,
  ) {
    this.id = id;
    this.name = name;
    this.cpf = cpf;
    this.rg = rg;
    this.birth_date = birth_date;
    this.phone = phone;
    this.status = status;
  }

  public getId() {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
    return this;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
    return this;
  }

  public getCpf(): string {
    return this.cpf;
  }

  public setCpf(cpf: string) {
    this.cpf = cpf;
    return this;
  }

  public getRg() {
    return this.rg;
  }

  public setRg(rg: string) {
    this.rg = rg;
    return this;
  }

  public getBirthDate(): Date {
    return this.birth_date;
  }

  public setBirthDate(birth_date: Date) {
    this.birth_date = birth_date;
    return this;
  }

  public getPhone(): string {
    return this.phone;
  }

  public setPhone(phone: string) {
    this.phone = phone;
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
