import UserRoleModel from '@db-models/UserRoleModel';
import HttpError from '@exceptions/HttpError';
import { IUserRolesReturn } from './UserRolesModel.types';

export default class UserRolesModel {
  public async listRolesPermissionsByUser(
    id: number,
  ): Promise<IUserRolesReturn[]> {
    try {
      const userPermissions = await UserRoleModel.findAll({
        where: { user_id: id },
        attributes: ['role_id'],
      });
      return userPermissions;
    } catch (error) {
      throw new HttpError(500, 'Erro no Servidor.');
    }
  }
}
