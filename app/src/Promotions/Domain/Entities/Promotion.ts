import PromotionCategory from './PromotionCategory';
import PromotionProduct from './PromotionProduct';

export default class Promotion {
  private id?: number;
  private name: string;
  private description: string;
  private discount_amount?: number;
  private discount_type?: string;
  private initial_date?: Date;
  private final_date?: Date;
  private status?: string;
  private promotion_category: PromotionCategory;
  private products?: Array<PromotionProduct>;

  constructor(
    name: string,
    description: string,
    promotion_category: PromotionCategory,
    products?: Array<PromotionProduct>,
    discount_amount?: number,
    discount_type?: string,
    initial_date?: Date,
    final_date?: Date,
    status?: string,
    id?: number,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.discount_amount = discount_amount;
    this.discount_type = discount_type;
    this.initial_date = initial_date;
    this.final_date = final_date;
    this.status = status;
    this.promotion_category = promotion_category;
    this.products = products;
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

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string) {
    this.description = description;
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

  public getInitialDate() {
    return this.initial_date;
  }

  public setInitialDate(initial_date: Date) {
    this.initial_date = initial_date;
    return this;
  }

  public getFinalDate() {
    return this.final_date;
  }

  public setFinalDate(final_date: Date) {
    this.final_date = final_date;
    return this;
  }

  public getStatus() {
    return this.status;
  }

  public setStatus(status: string) {
    this.status = status;
    return this;
  }

  public getPromotionCategory(): PromotionCategory {
    return this.promotion_category;
  }

  public setPromotionCategory(promotion_category: PromotionCategory) {
    this.promotion_category = promotion_category;
    return this;
  }

  public getProducts() {
    return this.products;
  }

  public setProducts(products: Array<PromotionProduct>) {
    this.products = products;
    return this;
  }
}
