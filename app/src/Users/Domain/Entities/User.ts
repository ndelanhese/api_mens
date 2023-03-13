export default class User {
  private id?: number;
  private first_name: string;
  private last_name: string;
  private phone: string;
  private email: string;
  private password: string;
  private status: string;

  constructor(
    first_name: string,
    last_name: string,
    phone: string,
    email: string,
    password: string,
    status: string,
    id?: number,
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.phone = phone;
    this.email = email;
    this.password = password;
    this.status = status;
  }

  public getId() {
    return this.id;
  }

  public setId(id?: number) {
    this.id = id;
    return this;
  }

  public getFirstName() {
    return this.first_name;
  }

  public setFirsName(first_name: string) {
    this.first_name = first_name;
    return this;
  }

  public getLastName() {
    return this.last_name;
  }

  public setLastName(last_name: string) {
    this.last_name = last_name;
    return this;
  }

  public getPhone() {
    return this.phone;
  }

  public setPhone(phone: string) {
    this.phone = phone;
    return this;
  }

  public getEmail() {
    return this.email;
  }

  public setEmail(email: string) {
    this.email = email;
    return this;
  }

  public getPassword() {
    return this.password;
  }

  public setPassword(password: string) {
    this.password = password;
    return this;
  }

  public getStatus() {
    return this.status;
  }

  public setStatus(status: string) {
    this.status = status;
    return this;
  }
}
