import usersRolesModel from '@db-models/UsersRolesModel';
import HttpError from '@exceptions/HttpError';
import NotFountHttpError from '@exceptions/NotFountHttpError';

import { IUserRolesReturn } from './UserRolesModel.types';

export default class UserRolesModel {
  public async listRolesPermissionsByUser(
    id: number,
  ): Promise<IUserRolesReturn[]> {
    try {
      const userRoles = await usersRolesModel.findAll({
        where: { user_id: id },
        attributes: ['role_id'],
      });
      if (!userRoles) {
        throw new NotFountHttpError();
      }
      return userRoles;
    } catch (error) {
      throw new HttpError(500, 'Erro ao buscar papéis do usuário.', error);
    }
  }
}
