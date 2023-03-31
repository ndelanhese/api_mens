import rolePermission from '@db-models/RolesPermissionsModel';
import HttpError from '@exceptions/HttpError';

import { IRolesPermissions, IRolesPermissionsOutput } from './RolesModel.types';

export default class RolePermission {
  public async createRolePermissions(
    payload: IRolesPermissions[],
  ): Promise<IRolesPermissionsOutput[]> {
    try {
      return await rolePermission.bulkCreate(payload);
    } catch (error) {
      throw new HttpError(500, 'Erro ao criar permissões.');
    }
  }

  public async deleteRolePermissions(roleId: number): Promise<void> {
    try {
      await rolePermission.destroy({
        where: { role_id: roleId },
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao deletar permissões.');
    }
  }
}
