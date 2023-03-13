import permissionModel from '@db-models/PermissionModel';
import HttpError from '@exceptions/HttpError';
import { IPermission, IPermissions } from './PermissionsModel.types';

export default class PermissionModel {
  public async findAll(): Promise<IPermissions[] | []> {
    try {
      const permissions = await permissionModel.findAll();
      if (permissions) {
        return permissions;
      }
      return [];
    } catch (error) {
      throw new HttpError(500, 'Erro no Servidor.');
    }
  }

  public async getPermissionByPk(id: number): Promise<IPermission | []> {
    try {
      const permission = await permissionModel.findByPk(id, {
        attributes: ['id', 'name', 'description'],
      });
      if (permission) return permission;
      return [];
    } catch (error) {
      throw new HttpError(500, 'Erro no Servidor.');
    }
  }
}
