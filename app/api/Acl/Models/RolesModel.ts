/* eslint-disable @typescript-eslint/no-explicit-any */
import roleModel from '@db-models/RolesModel';
import RolePermissionModel from '@db-models/RolesPermissionsModel';
import HttpError from '@exceptions/HttpError';

import {
  IRoleResponse,
  IRolesResponse,
  interfaceIRoleWithPermissions,
} from './RolesModel.types';

export default class RolesModel {
  public async getRoles(): Promise<IRolesResponse | []> {
    try {
      const roles = await roleModel.findAll({
        order: [['description', 'ASC']],
      });
      if (roles.length > 0) {
        return {
          data: roles,
        };
      }
      return [];
    } catch (error) {
      throw new HttpError(500, 'Erro ao buscar papéis.', error);
    }
  }

  public async getRoleByName(name: string): Promise<IRoleResponse | []> {
    try {
      const role = await roleModel.findOne({ where: { name } });
      if (role) return role;
      return [];
    } catch (error) {
      throw new HttpError(500, 'Erro ao buscar papel.', error);
    }
  }

  public async getRoleById(id: number): Promise<interfaceIRoleWithPermissions> {
    try {
      const role: any = await roleModel.findByPk(id, {
        include: {
          model: RolePermissionModel,
          as: 'permissions',
          attributes: ['permission_id'],
        },
      });
      if (!role) throw new HttpError(404, 'Papel não encontrado.');
      return role;
    } catch (error) {
      throw new HttpError(500, 'Erro ao buscar papel.', error);
    }
  }
}
