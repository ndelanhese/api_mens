export default class PromotionProduct {
  private id?: number;
  private promotion_id: number;
  private product_id: number;

  constructor(promotion_id: number, product_id: number, id?: number) {
    this.id = id;
    this.promotion_id = promotion_id;
    this.product_id = product_id;
  }

  public getId() {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
    return this;
  }

  public getPromotionId(): number {
    return this.promotion_id;
  }

  public setPromotionId(promotion_id: number) {
    this.promotion_id = promotion_id;
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
