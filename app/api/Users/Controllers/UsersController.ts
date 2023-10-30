import ListFactory from '@app/api/Shared/Factories/ListFactory';
import { StatusTypes } from '@app/src/Shared/Domain/Enums/StatusTypes';
import { formatCpf } from '@app/src/Shared/Infrastructure/Utils/CpfCnpjFormatter';
import { formatLocaleDateString } from '@app/src/Shared/Infrastructure/Utils/Date';
import {
  formatPhoneNumber,
  formatPisPasep,
  formatRG,
} from '@app/src/Shared/Infrastructure/Utils/Formatter';
import CreateUserAction from '@app/src/Users/Application/Actions/CreateUserAction';
import DeleteUserAction from '@app/src/Users/Application/Actions/DeleteUserAction';
import RestoreUserAction from '@app/src/Users/Application/Actions/RestoreUserAction';
import UpdateRolesAndPermissionsAction from '@app/src/Users/Application/Actions/UpdateRolesAndPermissionsAction';
import UpdateUserAction from '@app/src/Users/Application/Actions/UpdateUserAction';
import BaseController from '@base-controller/BaseController';
import HttpError from '@exceptions/HttpError';
import { Request, Response } from 'express';

import CreateUserFactory from '../Factories/CreateUserFactory';
import DeleteUserFactory from '../Factories/DeleteUserFactory';
import RestoreUserFactory from '../Factories/RestoreUserFactory';
import UpdateRolesAndPermissionsFactory from '../Factories/UpdateRolesAndPermissionsFactory';
import UpdateUserFactory from '../Factories/UpdateUserFactory';
import UserModel from '../Models/UsersModel';

import { IUser, IUserResponse } from './UsersController.types';

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
      const cacheKey = `users-${JSON.stringify(req.query)}`;
      const cache = await this.getCache(cacheKey);
      if (cache) return res.status(200).json(cache);
      const { status } = ListFactory.fromRequest(req);
      const users = await this.usersModel.findAll(status);
      const convertedUsers = this.prepareUsersResponse(users);
      const data = this.returnInData(convertedUsers);
      await this.createCache(cacheKey, data);
      return res.status(200).json(data);
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
      const user = this.userRolesAndPermissions(
        await this.usersModel.getUserByPk(Number(id)),
      );
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
      return res.status(201).json(userId);
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
      return res.status(204).send();
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
      return res.status(204).send();
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
      return res.status(204).send();
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
      await userAction.execute(userInputData, currentUserInputData);
      await this.deleteCache('users');
      return res.status(204).send();
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async getStatus(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'users_read');
      const cache = await this.getCache('users-status');
      if (cache) return res.status(200).json(cache);
      const status = StatusTypes.labelsToKeyValue();
      await this.createCache('users-status', status);
      return res.status(200).json(status);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  private userRolesAndPermissions(user: IUser) {
    const permissions = user?.users_permissions?.map(
      permission => permission.permission_id,
    );
    const roles = user?.users_roles?.map(role => role.role_id);
    return {
      id: user.id,
      user: user.user,
      email: user.email,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
      employee: {
        id: user.employee.id,
        name: user.employee.name,
        cpf: formatCpf(user.employee.cpf),
        rg: formatRG(user.employee.rg ?? ''),
        birth_date: formatLocaleDateString(user.employee.birth_date),
        phone: formatPhoneNumber(user.employee.phone),
        pis_pasep: formatPisPasep(user.employee.pis_pasep),
        admission_date: formatLocaleDateString(user.employee.admission_date),
        resignation_date: formatLocaleDateString(
          user.employee.resignation_date,
        ),
        status: user.employee.status,
      },
      users_roles: roles,
      permissions: permissions,
    };
  }

  private prepareUsersResponse(users: IUser[]): IUserResponse[] {
    return users.map(user => {
      const permissions = user?.users_permissions?.map(
        permission => permission.permission_id,
      );
      const roles = user?.users_roles?.map(role => role.role_id);

      return {
        id: user.id,
        user: user.user,
        email: user.email,
        status: user.status,
        employee: {
          id: user.employee.id,
          name: user.employee.name,
          cpf: formatCpf(user.employee.cpf),
          rg: formatRG(user.employee.rg ?? ''),
          birth_date: formatLocaleDateString(user.employee.birth_date),
          phone: formatPhoneNumber(user.employee.phone),
          pis_pasep: formatPisPasep(user.employee.pis_pasep),
          admission_date: formatLocaleDateString(user.employee.admission_date),
          resignation_date: formatLocaleDateString(
            user.employee.resignation_date,
          ),
          status: user.employee.status,
        },
        users_roles: roles,
        permissions: permissions,
      };
    });
  }
}
