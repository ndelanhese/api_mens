/* eslint-disable @typescript-eslint/no-explicit-any */
import userModel from '@db-models/UsersModel';
import userPermissionsModel from '@db-models/UsersPermissionsModel';
import userRoleModel from '@db-models/UsersRolesModel';
import HttpError from '@exceptions/HttpError';
import { Op } from 'sequelize';

import { IUser, IUserData } from './UsersModel.types';
export default class UserModel {
  public async findAll() {
    try {
      const users = await userModel.findAll({
        attributes: {
          exclude: ['password'],
        },
        order: [['id', 'ASC']],
      });
      if (users.length > 0) {
        return {
          data: users,
        };
      }
      return [];
    } catch (error) {
      throw new HttpError(500, 'Erro ao listar usuários.', error);
    }
  }

  public async getUserByPk(id: number): Promise<IUser> {
    try {
      const data: any = await userModel.findByPk(id, {
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
      if (!data) throw new HttpError(404, 'Usuário não encontrado.');
      return data;
    } catch (error) {
      if (error instanceof HttpError)
        throw new HttpError(error.statusCode, error.message, error);
      throw new HttpError(500, 'Erro ao buscar usuário.', error);
    }
  }

  public async getUser(id: number): Promise<IUserData | undefined> {
    try {
      const data = await userModel.findByPk(id);
      if (data) return data;
      throw new HttpError(404, 'Usuário não encontrado.');
    } catch (error) {
      if (error instanceof HttpError)
        throw new HttpError(error.statusCode, error.message, error);
      throw new HttpError(500, 'Erro ao buscar usuário.', error);
    }
  }

  public async getUsersDeleted() {
    try {
      return await userModel.findAll({
        attributes: {
          exclude: ['password'],
        },
        where: { deletedAt: { [Op.not]: null } },
        paranoid: false,
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao buscar os usuários deletados.', error);
    }
  }
}
