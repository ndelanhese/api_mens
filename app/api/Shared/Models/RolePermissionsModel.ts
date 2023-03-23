import rolePermission from '@db-models/RolesPermissionsModel';
import HttpError from '@exceptions/HttpError';
import NotFountHttpError from '@exceptions/NotFountHttpError';

import { IRolePermission } from './RolePermissionsModel.types';

export default class RolePermissions {
  public async getPermissionsByRole(
    roleId: number[],
  ): Promise<IRolePermission[]> {
    try {
      const rolesPermissions = await rolePermission.findAll({
        where: { role_id: roleId },
      });
      if (!rolesPermissions) {
        throw new NotFountHttpError();
      }
      return rolesPermissions;
    } catch (error) {
      throw new HttpError(500, 'Erro ao buscar permissões do papel.', error);
    }
  }
}
