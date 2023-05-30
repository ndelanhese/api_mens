import Employee from './Employee';

export default class User {
  private id?: number;
  private user: string;
  private email: string;
  private employee: Employee;

  constructor(user: string, email: string, employee: Employee, id?: number) {
    this.id = id;
    this.user = user;
    this.email = email;
    this.employee = employee;
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
    return this.employee;
  }

  public setEmployeeId(employee: Employee) {
    this.employee = employee;
    return this;
  }

  public getEmail() {
    return this.email;
  }

  public setEmail(email: string) {
    this.email = email;
    return this;
  }
}
