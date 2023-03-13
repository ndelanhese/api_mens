import { Op } from 'sequelize';
import HttpError from '@exceptions/HttpError';
import userModel from '@db-models/UserModel';
import userPermissionsModel from '@db-models/UserPermissionModel';
import userRoleModel from '@db-models/UserRoleModel';
import { IUser, IUserData, IUsers, IUsersDeleted } from './UsersModel.types';

export default class UserModel {
  public async findAll(): Promise<IUsers | []> {
    try {
      const users = await userModel.findAll({
        attributes: {
          exclude: ['password'],
        },
        order: [['id', 'DESC']],
      });
      if (users.length > 0) {
        return {
          data: users,
        };
      }
      return [];
    } catch (error) {
      throw new HttpError(500, 'Erro no Servidor.');
    }
  }

  public async getUserByPk(id: number): Promise<IUser | []> {
    try {
      const data = await userModel.findByPk(id, {
        attributes: {
          exclude: ['password', 'deletedAt', 'createdAt', 'updatedAt'],
        },
        include: [
          {
            model: userRoleModel,
            as: 'users_roles',
            attributes: ['role_id'],
          },
          {
            model: userPermissionsModel,
            as: 'users_permissions',
            attributes: ['permission_id'],
          },
        ],
      });
      if (data) return data;
      return [];
    } catch (error) {
      throw new HttpError(500, 'Erro no Servidor.');
    }
  }

  public async getUser(id: number): Promise<IUserData | undefined> {
    try {
      const data = await userModel.findByPk(id);
      if (data) return data;
    } catch (error) {
      throw new HttpError(500, 'Erro no Servidor.');
    }
  }

  public async getUsersDeleted(): Promise<IUsersDeleted[]> {
    try {
      return await userModel.findAll({
        attributes: {
          exclude: ['password'],
        },
        where: { deletedAt: { [Op.not]: null } },
        paranoid: false,
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao buscar os usuários deletados.');
    }
  }
}
