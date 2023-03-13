import userPermissionModel from '@db-models/UserPermissionModel';
import HttpError from '@exceptions/HttpError';
import { IUserPermissionOutput } from './UserPermissionsModel.types';
import UserPermissions from '../../Domain/Entities/UserPermissions';

export default class UserPermissionsModel {
  public async bulkCreate(
    payload: UserPermissions[],
  ): Promise<IUserPermissionOutput[]> {
    const userPermission = payload.map((userPermission) => ({
      permission_id: userPermission.getPermissionId(),
      user_id: userPermission.getUserId(),
    }));
    try {
      return await userPermissionModel.bulkCreate(userPermission);
    } catch (error) {
      throw new HttpError(500, 'Erro ao criar as permissões do usuário.');
    }
  }

  public async bulkDelete(id: number): Promise<void> {
    try {
      await userPermissionModel.destroy({
        where: { user_id: id },
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao deletar as permissões do usuário.');
    }
  }
}
