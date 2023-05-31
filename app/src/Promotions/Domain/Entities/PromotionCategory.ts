export default class PromotionCategory {
  private id?: number;
  private name: string;

  constructor(name: string, id?: number) {
    this.id = id;
    this.name = name;
  }

  public getId() {
    return this.id;
  }

  public setId?(id: number) {
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
}
