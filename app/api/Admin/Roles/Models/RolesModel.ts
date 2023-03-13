import roleModel from '@db-models/RoleModel';
import HttpError from '@exceptions/HttpError';
import { IRoleResponse, IRolesResponse } from './RolesModel.types';
import RolePermissionModel from '@db-models/RolePermissionModel';

export default class RolesModel {
  public async getRoles(): Promise<IRolesResponse | []> {
    try {
      const roles = await roleModel.findAll({
        order: [['id', 'DESC']],
      });
      if (roles.length > 0) {
        return {
          data: roles,
        };
      }
      return [];
    } catch (error) {
      throw new HttpError(500, 'Erro no Servidor.');
    }
  }

  public async getRoleByName(name: string): Promise<IRoleResponse | []> {
    try {
      const role = await roleModel.findOne({ where: { name } });
      if (role) return role;
      return [];
    } catch (error) {
      throw new HttpError(500, 'Erro no Servidor.');
    }
  }

  public async getRoleById(id: number): Promise<roleModel> {
    try {
      const role = await roleModel.findByPk(id, {
        include: {
          model: RolePermissionModel,
          as: 'permissions',
          attributes: [['permission_id', 'permission']],
        },
      });
      if (!role) throw new HttpError(404, 'Papel não encontrado.');
      return role;
    } catch (error) {
      throw new HttpError(500, 'Erro ao buscar papel.');
    }
  }
}
