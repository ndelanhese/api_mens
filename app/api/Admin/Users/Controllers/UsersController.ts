import { IUser } from './UsersController.types';
import { Request, Response } from 'express';
import HttpError from '@exceptions/HttpError';
import UserModel from '../Models/UsersModel';
import { IUsers } from './UsersController.types';
import BaseController from '@admin-base-controller/BaseController';
import CreateUserFactory from '../Factories/CreateUserFactory';
import CreateUserAction from '@app/src/Users/Application/Actions/CreateUserAction';
import DeleteUserFactory from '../Factories/DeleteUserFactory';
import DeleteUserAction from '@app/src/Users/Application/Actions/DeleteUserAction';
import RestoreUserFactory from '../Factories/RestoreUserFactory';
import RestoreUserAction from '@app/src/Users/Application/Actions/RestoreUserAction';
import UpdateRolesAndPermissionsAction from '@app/src/Users/Application/Actions/UpdateRolesAndPermissionsAction';
import UpdateRolesAndPermissionsFactory from '../Factories/UpdateRolesAndPermissionsFactory';
import UpdateUserFactory from '../Factories/UpdateUserFactory';
import UpdateUserAction from '@app/src/Users/Application/Actions/UpdateUserAction';

export default class UsersController extends BaseController {
  private usersModel: UserModel;

  constructor() {
    super();
    this.usersModel = new UserModel();
  }

  public async getUsers(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'users_read');
      const cache = await this.getCache('users');
      if (cache) return res.status(200).json(cache);
      const users = await this.usersModel.findAll();
      await this.createCache('users', users);
      return res.status(200).json(users);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async getUserById(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'users_read');
      const { id } = req.params;
      const cache = await this.getCache(`users-${id}`);
      if (cache) return res.status(200).json(cache);
      const user = await this.usersModel.getUserByPk(Number(id));
      await this.createCache(`users-${id}`, user);
      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async getDeletedUsers(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'deleted_users_read');
      const cache = await this.getCache('deleted-users');
      if (cache) return res.status(200).json(cache);
      const users = await this.usersModel.getUsersDeleted();
      if (!users)
        throw new HttpError(500, 'Erro ao buscar os usuários deletados.');
      await this.createCache('deleted-users', users);
      return res.status(200).json(users);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async createUser(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'users_create');
      const userInputData = CreateUserFactory.fromRequest(req);
      const userAction = new CreateUserAction();
      const userId = (await userAction.execute(userInputData)).getId();
      await this.deleteCache('users');
      return res.status(200).json(userId);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      return res.status(400).json({ message: 'E-mail já cadastrado.' });
    }
  }
  public async deleteUser(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'users_delete');
      const userInputData = DeleteUserFactory.fromRequest(req);
      const userAction = new DeleteUserAction();
      await userAction.execute(userInputData);
      await this.deleteCache('users');
      return res.status(200).json('Usuário deletado com sucesso.');
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }
  public async restoreUser(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'restore_users');
      const userInputData = RestoreUserFactory.fromRequest(req);
      const userAction = new RestoreUserAction();
      await userAction.execute(userInputData);
      await this.deleteCache('users');
      return res.status(200).json('Usuário restaurado com sucesso.');
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }
  public async updateRolesAndPermission(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'users_update');
      const userInputData = UpdateRolesAndPermissionsFactory.fromRequest(req);
      const userAction = new UpdateRolesAndPermissionsAction();
      await userAction.execute(userInputData);
      await this.deleteCache('users');
      return res
        .status(200)
        .json('Papéis e Permissões atualizadas com sucesso.');
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }
  public async updateUser(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'users_update');
      const userInputData = UpdateUserFactory.fromRequest(req);
      const userAction = new UpdateUserAction();
      const currentUser = await this.usersModel.getUser(userInputData.id);
      if (!currentUser) throw new HttpError(404, 'Usuário não encontrado.');
      const currentUserInputData =
        UpdateUserFactory.fromCurrentUser(currentUser);
      const user = await userAction.execute(
        userInputData,
        currentUserInputData,
      );
      await this.deleteCache('users');
      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }
}
