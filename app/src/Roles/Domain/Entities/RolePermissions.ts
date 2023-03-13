export default class RolePermissions {
  private id?: number;
  private role_id: number;
  private permission_id: number;

  constructor(role_id: number, permission_id: number, id?: number) {
    this.id = id;
    this.role_id = role_id;
    this.permission_id = permission_id;
  }

  public getId() {
    return this.id;
  }

  public setId(id: number) {
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

  public getPermissionId() {
    return this.permission_id;
  }

  public setPermissionId(permission_id: number) {
    this.permission_id = permission_id;
    return this;
  }
}
