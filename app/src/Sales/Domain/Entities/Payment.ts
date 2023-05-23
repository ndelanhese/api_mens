export default class Payment {
  private type: number;
  private installment: number;

  constructor(type: number, installment: number) {
    this.type = type;
    this.installment = installment;
  }

  public getType(): number {
    return this.type;
  }

  public setType(type: number) {
    this.type = type;
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
