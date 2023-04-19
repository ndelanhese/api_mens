import permissionModel from '@db-models/PermissionsModel';
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
      throw new HttpError(404, 'Permissão não encontrada.');
    } catch (error) {
      if (error instanceof HttpError)
        throw new HttpError(error.statusCode, error.message, error);
      throw new HttpError(500, 'erro ao buscar permissão.', error);
    }
  }

  public async getPermissions(): Promise<IPermission[]> {
    try {
      return await permissionModel.findAll({
        attributes: ['id', 'name', 'description', 'group'],
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao buscar permissões.', error);
    }
  }
}
