import Customer from './Customer';
import Product from './Product';
import User from './User';

export default class Order {
  private id?: number;
  private date: Date;
  private observation?: string;
  private description?: string;
  private status?: string;
  private customer: Customer;
  private user: User;
  private products?: Product[];

  constructor(
    date: Date,
    customer: Customer,
    user: User,
    products?: Product[],
    observation?: string,
    description?: string,
    status?: string,
    id?: number,
  ) {
    this.id = id;
    this.date = date;
    this.observation = observation;
    this.description = description;
    this.status = status;
    this.customer = customer;
    this.user = user;
    this.products = products;
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

  public getDescription() {
    return this.description;
  }

  public setDescription(description: string) {
    this.description = description;
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

  public getProducts() {
    return this.products;
  }

  public setProducts(products: Product[]) {
    this.products = products;
    return this;
  }
}
