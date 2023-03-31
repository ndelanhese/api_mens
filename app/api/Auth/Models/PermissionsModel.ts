import permissionModel from '@db-models/PermissionsModel';
import HttpError from '@exceptions/HttpError';

import { IPermission } from './PermissionsModel.types';

export default class PermissionsModel {
  public async getPermissionsById(id: number[]): Promise<IPermission[]> {
    try {
      const permission = await permissionModel.findAll({
        attributes: ['id', 'name', 'description'],
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

  public async getPermissions(): Promise<IPermission[]> {
    try {
      return await permissionModel.findAll({
        attributes: ['id', 'name', 'description'],
      });
    } catch (error) {
      throw new HttpError(500, 'Erro no Servidor.');
    }
  }
}
