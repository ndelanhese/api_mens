export default class Product {
  private id: number;
  private part_number?: string;
  private name?: string;
  private quantity: number;

  constructor(
    id: number,
    quantity: number,
    part_number?: string,
    name?: string,
  ) {
    this.id = id;
    this.part_number = part_number;
    this.name = name;
    this.quantity = quantity;
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
    return this;
  }

  public getPartNumber() {
    return this.part_number;
  }

  public setPartNumber(part_number: string) {
    this.part_number = part_number;
    return this;
  }

  public getName() {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
    return this;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public setQuantity(quantity: number) {
    this.quantity = quantity;
    return this;
  }
}
