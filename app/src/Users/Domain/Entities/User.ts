export default class User {
  private id?: number;
  private user: string;
  private email: string;
  private password: string;
  private status: string;
  private employee_id: number;

  constructor(
    user: string,
    email: string,
    password: string,
    status: string,
    employee_id: number,
    id?: number,
  ) {
    this.id = id;
    this.user = user;
    this.email = email;
    this.password = password;
    this.status = status;
    this.employee_id = employee_id;
  }

  public getId() {
    return this.id;
  }

  public setId(id?: number) {
    this.id = id;
    return this;
  }

  public getUser() {
    return this.user;
  }

  public setUser(user: string) {
    this.user = user;
    return this;
  }

  public getEmployeeId() {
    return this.employee_id;
  }

  public setEmployeeId(employee_id: number) {
    this.employee_id = employee_id;
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
