import rolePermission from '@db-models/RolesPermissionsModel';
import HttpError from '@exceptions/HttpError';

import { IRolePermission } from './RolePermissionsModel.types';

export default class RolePermissions {
  public async getPermissionsByRole(
    roleId: number[],
  ): Promise<IRolePermission[]> {
    try {
      return await rolePermission.findAll({
        where: { role_id: roleId },
      });
    } catch (error) {
      throw new HttpError(500, 'Erro no Servidor.');
    }
  }
}
