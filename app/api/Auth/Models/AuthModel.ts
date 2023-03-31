import userModel from '@db-models/UsersModel';
import userPermissionModel from '@db-models/UsersPermissionsModel';
import userRoleModel from '@db-models/UsersRolesModel';
import HttpError from '@exceptions/HttpError';

import { IUser } from './AuthModel.types';

export default class UserModel {
  public async getUserByEmail(email: string): Promise<IUser | undefined> {
    try {
      const data = await userModel.findOne({
        where: {
          email,
        },
        include: [
          {
            model: userRoleModel,
            as: 'users_roles',
          },
          {
            model: userPermissionModel,
            as: 'users_permissions',
          },
        ],
      });
      if (data) {
        return data;
      }
    } catch (error) {
      console.error(error);
      throw new HttpError(500, 'Erro ao buscar usuário.', error);
    }
  }
}
