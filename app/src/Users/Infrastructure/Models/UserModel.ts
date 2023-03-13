import { IUser } from './UserModel.types';
import { Op, UniqueConstraintError } from 'sequelize';
import HttpError from '@exceptions/HttpError';
import userModel from '@db-models/UserModel';
import userRoleModel from '@db-models/UserRoleModel';
import User from '../../Domain/Entities/User';

export default class UserModel {
  public async getUserByPk(userId: number): Promise<IUser | null> {
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
      throw new HttpError(500, 'Erro ao buscar usuário.');
    }
  }

  public async createUser(payload: User): Promise<IUser> {
    try {
      return await userModel.create({
        first_name: payload.getFirstName(),
        last_name: payload.getLastName(),
        phone_number: payload.getPhone(),
        email: payload.getEmail(),
        password: payload.getPassword(),
        status: payload.getStatus(),
      });
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new HttpError(400, 'E-mail já cadastrado.');
      }
      throw new HttpError(500, 'Erro ao cadastrar usuário.');
    }
  }

  public async updateUser(payload: User): Promise<void> {
    try {
      await userModel.update(
        {
          first_name: payload.getFirstName(),
          last_name: payload.getLastName(),
          phone_number: payload.getPhone(),
          email: payload.getEmail(),
          password: payload.getPassword(),
          status: payload.getStatus(),
        },
        {
          where: { id: payload.getId() },
        },
      );
    } catch (error) {
      throw new HttpError(500, 'Erro ao atualizar usuário.');
    }
  }

  public async deleteUser(userId: number): Promise<void> {
    try {
      await userModel.destroy({ where: { id: userId } });
    } catch (error) {
      throw new HttpError(500, 'Erro ao excluir usuário.');
    }
  }

  public async findAllSoftDeleted(): Promise<IUser[]> {
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
      throw new HttpError(500, 'Erro ao buscar usuários deletados.');
    }
  }

  public async restoreUser(userId: number): Promise<void> {
    try {
      await userModel.restore({ where: { id: userId } });
    } catch (error) {
      throw new HttpError(500, 'Erro ao restaurar usuários.');
    }
  }
}
