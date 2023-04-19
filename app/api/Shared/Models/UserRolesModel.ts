/* eslint-disable @typescript-eslint/no-explicit-any */
import RoleModel from '@db-models/RolesModel';
import UserRoleModel from '@db-models/UsersRolesModel';
import HttpError from '@exceptions/HttpError';

import { IUserRolesReturn } from './UserRolesModel.types';

export default class UserRolesModel {
  public async listRolesByUser(id: number): Promise<IUserRolesReturn[] | []> {
    try {
      const userRoles: any = await UserRoleModel.findAll({
        where: { user_id: id },
        attributes: ['role_id'],
        include: {
          model: RoleModel,
          attributes: ['name', 'description'],
        },
      });
      return userRoles;
    } catch (error) {
      throw new HttpError(500, 'Erro ao buscar papéis do usuário.', error);
    }
  }
}
