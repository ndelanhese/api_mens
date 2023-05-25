export default class Product {
  private id: number;
  private part_number?: string;
  private name?: string;
  private quantity: number;
  private discount_amount?: number;
  private discount_type?: string;
  private final_value: number;

  constructor(
    id: number,
    quantity: number,
    final_value: number,
    discount_amount?: number,
    discount_type?: string,
    part_number?: string,
    name?: string,
  ) {
    this.id = id;
    this.part_number = part_number;
    this.name = name;
    this.quantity = quantity;
    this.discount_amount = discount_amount;
    this.discount_type = discount_type;
    this.final_value = final_value;
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

  public getDiscountAmount() {
    return this.discount_amount;
  }

  public setDiscountAmount(discount_amount: number) {
    this.discount_amount = discount_amount;
    return this;
  }

  public getDiscountType() {
    return this.discount_type;
  }

  public setDiscountType(discount_type: string) {
    this.discount_type = discount_type;
    return this;
  }

  public getFinalValue(): number {
    return this.final_value;
  }

  public setFinalValue(final_value: number) {
    this.final_value = final_value;
    return this;
  }
}
