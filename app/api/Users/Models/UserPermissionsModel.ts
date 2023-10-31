import PermissionsModel from '@db-models/PermissionsModel';
import userPermissionModel from '@db-models/UsersPermissionsModel';
import HttpError from '@exceptions/HttpError';

import { IUserPermissions } from './UserPermissionsModel.types';

export default class UserPermissionModel {
  public async getUserPermissions(id: number): Promise<IUserPermissions[]> {
    try {
      return (await userPermissionModel.findAll({
        where: { user_id: id },
        include: {
          model: PermissionsModel,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      })) as any;
    } catch (error) {
      throw new HttpError(500, 'Erro no Servidor.');
    }
  }
}
