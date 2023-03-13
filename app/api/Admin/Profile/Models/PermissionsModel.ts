import permissionModel from '@db-models/PermissionModel';
import HttpError from '@exceptions/HttpError';
import { IPermission } from './PermissionsModel.types';

export default class PermissionsModel {
  public async getPermissionsById(id: number[]): Promise<IPermission[]> {
    try {
      const permission = await permissionModel.findAll({
        attributes: ['id', 'name', 'description', 'group'],
        where: { id },
      });
      if (permission) {
        return permission;
      }
      throw new HttpError(500, 'Erro no Servidor.');
    } catch (error) {
      throw new HttpError(500, 'Erro no Servidor.');
    }
  }
}
