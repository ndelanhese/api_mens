import permissionsModel from '@db-models/PermissionsModel';
import HttpError from '@exceptions/HttpError';
import NotFoundHttpError from '@exceptions/NotFountHttpError';

import { IPermission } from './PermissionsModel.types';

export default class PermissionsModel {
  public async getPermissionsById(id: number[]): Promise<IPermission[]> {
    try {
      const permission = await permissionsModel.findAll({
        attributes: ['id', 'name', 'description', 'group'],
        where: { id },
      });
      if (!permission) {
        throw new NotFoundHttpError();
      }
      return permission;
    } catch (error) {
      throw new HttpError(500, 'Erro ao buscar permissão.', error);
    }
  }
}
