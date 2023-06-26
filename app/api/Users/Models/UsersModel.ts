/* eslint-disable @typescript-eslint/no-explicit-any */
import employeesModel from '@db-models/EmployeesModel';
import userModel from '@db-models/UsersModel';
import HttpError from '@exceptions/HttpError';
import { Op, WhereOptions } from 'sequelize';

import { IUser, IUserData } from './UsersModel.types';
export default class UserModel {
  public async findAll(status?: string) {
    try {
      let whereClause: WhereOptions = {};
      if (status) whereClause = { status };
      return await userModel.findAll({
        where: whereClause,
        attributes: {
          exclude: ['password', 'employee_id'],
        },
        order: [['id', 'ASC']],
        include: { model: employeesModel, as: 'employee' },
      });
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
        include: { all: true },
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
