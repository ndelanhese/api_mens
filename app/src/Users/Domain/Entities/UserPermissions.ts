export default class UserPermissions {
  private id?: number;
  private permission_id: number;
  private user_id: number;

  constructor(permission_id: number, user_id: number, id?: number) {
    this.id = id;
    this.permission_id = permission_id;
    this.user_id = user_id;
  }

  public getId() {
    return this.id;
  }

  public setId?(id: number) {
    this.id = id;
    return this;
  }

  public getPermissionId() {
    return this.permission_id;
  }

  public setPermissionId(permission_id: number) {
    this.permission_id = permission_id;
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
