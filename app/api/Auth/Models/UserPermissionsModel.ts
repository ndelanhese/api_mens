import userPermissionModel from '@db-models/UsersPermissionsModel';
import HttpError from '@exceptions/HttpError';

import { IUserPermissions } from './UserPermissionsModel.types';

export default class UserPermissionModel {
  public async getUserPermissions(id: number): Promise<IUserPermissions[]> {
    try {
      return await userPermissionModel.findAll({
        where: { user_id: id },
      });
    } catch (error) {
      throw new HttpError(500, 'Erro no Servidor.');
    }
  }
}
