import userRoleModel from '@db-models/UserRoleModel';
import HttpError from '@exceptions/HttpError';
import { IUserRoleOutput } from './UserRoleModel.types';
import UserRole from '../../Domain/Entities/UserRoles';

export default class UserRolesModel {
  public async bulkCreate(payload: UserRole[]): Promise<IUserRoleOutput[]> {
    try {
      const userRole = payload.map((userRole) => ({
        role_id: userRole.getRoleId(),
        user_id: userRole.getUserId(),
      }));
      return await userRoleModel.bulkCreate(userRole);
    } catch (error) {
      throw new HttpError(500, 'Erro ao criar os papeis do usuário.');
    }
  }

  public async bulkDelete(id: number): Promise<void> {
    try {
      await userRoleModel.destroy({
        where: { user_id: id },
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao deletar os papéis do usuário.');
    }
  }
}
