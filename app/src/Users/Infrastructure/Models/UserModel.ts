import userModel from '@db-models/UsersModel';
import userRoleModel from '@db-models/UsersRolesModel';
import HttpError from '@exceptions/HttpError';
import { Op, UniqueConstraintError } from 'sequelize';

import User from '../../Domain/Entities/User';

export default class UserModel {
  public async getUserByPk(userId: number) {
    try {
      return await userModel.findByPk(userId, {
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: userRoleModel,
            as: 'users_roles',
          },
        ],
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao buscar usuário.', error);
    }
  }

  public async createUser(payload: User) {
    try {
      return await userModel.create({
        user: payload.getUser(),
        email: payload.getEmail(),
        password: payload.getPassword(),
        status: payload.getStatus(),
        employee_id: payload.getEmployeeId(),
      });
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new HttpError(400, 'E-mail já cadastrado.', error);
      }
      throw new HttpError(500, 'Erro ao cadastrar usuário.', error);
    }
  }

  public async updateUser(payload: User): Promise<void> {
    try {
      await userModel.update(
        {
          user: payload.getUser(),
          email: payload.getEmail(),
          password: payload.getPassword(),
          status: payload.getStatus(),
          employee_id: payload.getEmployeeId(),
        },
        {
          where: { id: payload.getId() },
        },
      );
    } catch (error) {
      throw new HttpError(500, 'Erro ao atualizar usuário.', error);
    }
  }

  public async deleteUser(userId: number): Promise<number> {
    try {
      const deleted = await userModel.destroy({ where: { id: userId } });
      if (deleted === 0) throw new HttpError(404, 'Usuário não encontrado.');
      return deleted;
    } catch (error) {
      if (error instanceof HttpError) {
        throw new HttpError(error.statusCode, error.message, error);
      }
      throw new HttpError(500, 'Erro ao excluir usuário.', error);
    }
  }

  public async findAllSoftDeleted() {
    try {
      return await userModel.findAll({
        attributes: {
          exclude: ['password'],
        },
        where: { deletedAt: { [Op.not]: null } },
        paranoid: false,
        order: [['id', 'ASC']],
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao buscar usuários deletados.', error);
    }
  }

  public async restoreUser(userId: number): Promise<void> {
    try {
      await userModel.restore({ where: { id: userId } });
    } catch (error) {
      throw new HttpError(500, 'Erro ao restaurar usuários.', error);
    }
  }
}
