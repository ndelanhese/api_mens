import userRoleModel from '@db-models/UsersRolesModel';
import HttpError from '@exceptions/HttpError';

import UserRole from '../../Domain/Entities/UserRoles';

import { IUserRoleOutput } from './UserRoleModel.types';

export default class UserRolesModel {
  public async bulkCreate(payload: UserRole[]): Promise<IUserRoleOutput[]> {
    try {
      const userRole = payload.map(userRole => ({
        role_id: userRole.getRoleId(),
        user_id: userRole.getUserId(),
      }));
      return await userRoleModel.bulkCreate(userRole);
    } catch (error) {
      throw new HttpError(500, 'Erro ao criar os papeis do usuário.', error);
    }
  }

  public async bulkDelete(id: number): Promise<void> {
    try {
      await userRoleModel.destroy({
        where: { user_id: id },
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao deletar os papéis do usuário.', error);
    }
  }
}
