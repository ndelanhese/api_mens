export default class Employee {
  private id?: number;
  private name: string;
  private cpf: string;
  private rg?: string;
  private birth_date: Date;
  private phone: string;
  private pis_pasep: string;
  private admission_date: Date;
  private resignation_date?: Date;
  private status: string;

  constructor(
    name: string,
    cpf: string,
    birth_date: Date,
    phone: string,
    pis_pasep: string,
    admission_date: Date,
    status: string,
    rg?: string,
    resignation_date?: Date,
    id?: number,
  ) {
    this.id = id;
    this.name = name;
    this.cpf = cpf;
    this.rg = rg;
    this.birth_date = birth_date;
    this.phone = phone;
    this.pis_pasep = pis_pasep;
    this.admission_date = admission_date;
    this.resignation_date = resignation_date;
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

  public getPisPasep(): string {
    return this.pis_pasep;
  }

  public setPisPasep(pis_pasep: string) {
    this.pis_pasep = pis_pasep;
    return this;
  }

  public getAdmissionDate(): Date {
    return this.admission_date;
  }

  public setAdmissionDate(admission_date: Date) {
    this.admission_date = admission_date;
    return this;
  }

  public getResignationDate() {
    return this.resignation_date;
  }

  public setResignationDate(resignation_date?: Date) {
    this.resignation_date = resignation_date;
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
