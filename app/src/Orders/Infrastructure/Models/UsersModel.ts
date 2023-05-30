/* eslint-disable @typescript-eslint/no-explicit-any */
import userModel from '@db-models/UsersModel';
import HttpError from '@exceptions/HttpError';

import { IUser } from './CustomerModel.types';

export default class UserModel {
  public async getUser(id: number): Promise<IUser> {
    try {
      const user: any = await userModel.findByPk(id, {
        include: { all: true },
        attributes: {
          exclude: ['password'],
        },
      });
      if (!user) throw new HttpError(404, 'Usuário não encontrado.');
      return user;
    } catch (error) {
      if (error instanceof HttpError)
        throw new HttpError(error.statusCode, error.message, error);
      throw new HttpError(500, 'Erro ao buscar usuário.', error);
    }
  }
}
