import rolePermission from '@db-models/RolePermissionModel';
import HttpError from '@exceptions/HttpError';
import { IRolePermission } from './RolePermissionsModel.types';

export default class RolePermissions {
  public async getPermissionsByRole(
    roleId: number[],
  ): Promise<IRolePermission[]> {
    try {
      const rolesPermissions = await rolePermission.findAll({
        where: { role_id: roleId },
      });
      return rolesPermissions;
    } catch (error) {
      throw new HttpError(500, 'Erro no Servidor.');
    }
  }
}
