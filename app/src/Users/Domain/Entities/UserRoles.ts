export default class UserRole {
  private id?: number;
  private role_id: number;
  private user_id: number;

  constructor(role_id: number, user_id: number, id?: number) {
    this.id = id;
    this.role_id = role_id;
    this.user_id = user_id;
  }

  public getId() {
    return this.id;
  }

  public setId?(id: number) {
    this.id = id;
    return this;
  }

  public getRoleId() {
    return this.role_id;
  }

  public setRoleId(role_id: number) {
    this.role_id = role_id;
    return this;
  }

  public getUserId() {
    return this.user_id;
  }

  public setUserId(user_id: number) {
    this.user_id = user_id;
    return this;
  }
}
