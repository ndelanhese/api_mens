import usersPermissionsModel from '@db-models/UsersPermissionsModel';
import HttpError from '@exceptions/HttpError';
import NotFountHttpError from '@exceptions/NotFountHttpError';

import { IUserPermissions } from './UserPermissionsModel.types';

export default class UserPermissionModel {
  public async getUserPermissions(id: number): Promise<IUserPermissions[]> {
    try {
      const userPermissions = await usersPermissionsModel.findAll({
        where: { user_id: id },
      });
      if (!userPermissions) {
        throw new NotFountHttpError();
      }
      return userPermissions;
    } catch (error) {
      throw new HttpError(500, 'Erro ao buscar permissões do usuário.', error);
    }
  }
}
