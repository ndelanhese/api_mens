import HttpError from '@exceptions/HttpError';
import userModel from '@db-models/UserModel';
import userRoleModel from '@db-models/UserRoleModel';
import userPermissionModel from '@db-models/UserPermissionModel';
import { IUser } from './LoginModel.types';

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
      throw new HttpError(500, 'Erro no Servidor.');
    }
  }
}
