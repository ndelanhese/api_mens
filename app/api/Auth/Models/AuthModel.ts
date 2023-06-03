import userModel from '@db-models/UsersModel';
import userPermissionModel from '@db-models/UsersPermissionsModel';
import userRoleModel from '@db-models/UsersRolesModel';
import HttpError from '@exceptions/HttpError';

export default class UserModel {
  public async getUserByEmail(email: string) {
    try {
      return await userModel.findOne({
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
    } catch (error) {
      console.error(error);
      throw new HttpError(500, 'Erro ao buscar usuário.', error);
    }
  }
}
