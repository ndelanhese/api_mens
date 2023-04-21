import roleModel from '@db-models/RolesModel';
import rolePermissionModel from '@db-models/RolesPermissionsModel';
import HttpError from '@exceptions/HttpError';

import Role from '../../Domain/Entities/Role';

import { IRolesModel } from './RolesModel.types';

export default class RoleModel {
  public async createRole(payload: Role): Promise<IRolesModel> {
    try {
      return await roleModel.create({
        name: payload.getName(),
        description: payload.getDescription(),
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao criar papel.', error);
    }
  }

  public async updateRole(payload: Role): Promise<void> {
    try {
      await roleModel.update(
        {
          name: payload.getName(),
          description: payload.getDescription(),
        },
        {
          where: { id: payload.getId() },
        },
      );
    } catch (error) {
      throw new HttpError(500, 'Erro ao atualizar papel.', error);
    }
  }

  public async deleteRole(roleId: number): Promise<void> {
    try {
      await rolePermissionModel.destroy({ where: { role_id: roleId } });
      await roleModel.destroy({ where: { id: roleId } });
    } catch (error) {
      throw new HttpError(500, 'Erro ao deletar papel.', error);
    }
  }
}
