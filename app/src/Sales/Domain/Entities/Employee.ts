export default class Employee {
  private id?: number;
  private name: string;
  private cpf: string;

  constructor(name: string, cpf: string, id?: number) {
    this.id = id;
    this.name = name;
    this.cpf = cpf;
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
}
