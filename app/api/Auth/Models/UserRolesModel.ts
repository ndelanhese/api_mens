/* eslint-disable @typescript-eslint/no-explicit-any */
import RoleModel from '@db-models/RolesModel';
import UserRoleModel from '@db-models/UsersRolesModel';
import HttpError from '@exceptions/HttpError';
import NotAuthorizedHttpError from '@exceptions/NotAuthorizedHttpError';

import { IUserRolesReturn } from './UserRolesModel.types';

export default class UserRolesModel {
  public async listRolesByUser(id: number): Promise<IUserRolesReturn[] | []> {
    try {
      const userRoles: any = await UserRoleModel.findAll({
        where: { user_id: id },
        attributes: ['role_id'],
        include: {
          model: RoleModel,
          attributes: ['name'],
        },
      });
      if (userRoles.length === 0) throw new NotAuthorizedHttpError();
      return userRoles;
    } catch (error) {
      console.error(error);
      throw new HttpError(500, 'Erro no Servidor.');
    }
  }
}
