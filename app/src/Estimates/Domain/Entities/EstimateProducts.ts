export default class EstimateProducts {
  private product_id: number;
  private estimate_id: number;
  private qtd: number;
  private id?: number;

  constructor(
    product_id: number,
    estimate_id: number,
    qtd: number,
    id?: number,
  ) {
    this.product_id = product_id;
    this.estimate_id = estimate_id;
    this.qtd = qtd;
    this.id = id;
  }

  public getId() {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
    return this;
  }

  public getProductId() {
    return this.product_id;
  }

  public setProductId(productId: number) {
    this.product_id = productId;
    return this;
  }
  public getEstimateId() {
    return this.estimate_id;
  }

  public setEstimateId(estimateId: number) {
    this.estimate_id = estimateId;
    return this;
  }

  public getQtd() {
    return this.qtd;
  }

  public setQtd(qtd: number) {
    this.qtd = qtd;
    return this;
  }
}
