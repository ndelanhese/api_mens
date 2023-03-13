import RolePermissions from '../../Domain/Entities/RolePermissions';
import RolePermissionsModel from '../Models/RolePermissions';

export default class RolePermissionsRepository {
  private rolePermissionsModel: RolePermissionsModel;

  constructor() {
    this.rolePermissionsModel = new RolePermissionsModel();
  }

  async save(rolePermissions: RolePermissions[]): Promise<RolePermissions[]> {
    return this.create(rolePermissions);
  }

  async create(rolePermissions: RolePermissions[]): Promise<RolePermissions[]> {
    const payload = rolePermissions.map((rolePermission) => ({
      role_id: rolePermission.getRoleId(),
      permission_id: rolePermission.getPermissionId(),
    }));
    const rolePermission =
      await this.rolePermissionsModel.createRolePermissions(payload);
    return rolePermission.map(
      (rolePermission) =>
        new RolePermissions(
          rolePermission.role_id,
          rolePermission.permission_id,
          rolePermission.id,
        ),
    );
  }

  async delete(roleId: number): Promise<void> {
    await this.rolePermissionsModel.deleteRolePermissions(roleId);
  }
}
