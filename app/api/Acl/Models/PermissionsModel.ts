import permissionModel from '@db-models/PermissionsModel';
import HttpError from '@exceptions/HttpError';

import { IPermissions } from './PermissionsModel.types';

export default class PermissionModel {
  public async findAll(): Promise<IPermissions[] | []> {
    try {
      const permissions = await permissionModel.findAll();
      if (permissions) {
        return permissions;
      }
      return [];
    } catch (error) {
      throw new HttpError(500, 'Erro ao buscar permissões.', error);
    }
  }
}
