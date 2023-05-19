import Customer from './Customer';
import User from './User';

export default class Sale {
  private id?: number;
  private date: Date;
  private observation?: string;
  private total_value: number;
  private discount_amount?: number;
  private discount_type?: string;
  private final_value: number;
  private status?: string;
  private customer: Customer;
  private user: User;

  constructor(
    date: Date,
    total_value: number,
    final_value: number,
    customer: Customer,
    user: User,
    observation?: string,
    discount_amount?: number,
    discount_type?: string,
    status?: string,
    id?: number,
  ) {
    this.id = id;
    this.date = date;
    this.observation = observation;
    this.total_value = total_value;
    this.discount_amount = discount_amount;
    this.discount_type = discount_type;
    this.final_value = final_value;
    this.status = status;
    this.customer = customer;
    this.user = user;
  }

  public getId() {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
    return this;
  }

  public getDate(): Date {
    return this.date;
  }

  public setDate(date: Date) {
    this.date = date;
    return this;
  }

  public getObservation() {
    return this.observation;
  }

  public setObservation(observation: string) {
    this.observation = observation;
    return this;
  }

  public getTotalValue(): number {
    return this.total_value;
  }

  public setTotalValue(total_value: number) {
    this.total_value = total_value;
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

  public getStatus() {
    return this.status;
  }

  public setStatus(status: string) {
    this.status = status;
    return this;
  }

  public getCustomer(): Customer {
    return this.customer;
  }

  public setCustomer(customer: Customer) {
    this.customer = customer;
    return this;
  }

  public getUser(): User {
    return this.user;
  }

  public setUser(user: User) {
    this.user = user;
    return this;
  }
}
