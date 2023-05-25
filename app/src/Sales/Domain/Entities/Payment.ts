export default class Payment {
  private id: number;
  private installment: number;
  private name?: string;

  constructor(id: number, installment: number, name?: string) {
    this.id = id;
    this.name = name;
    this.installment = installment;
  }

  public getId(): number {
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

  public getInstallment(): number {
    return this.installment;
  }

  public setInstallment(installment: number) {
    this.installment = installment;
    return this;
  }
}
