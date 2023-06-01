export default class PromotionProduct {
  private id?: number;
  private product_id: number;

  constructor(product_id: number, id?: number) {
    this.id = id;
    this.product_id = product_id;
  }

  public getId() {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
    return this;
  }

  public getProductId(): number {
    return this.product_id;
  }

  public setProductId(product_id: number) {
    this.product_id = product_id;
    return this;
  }
}
