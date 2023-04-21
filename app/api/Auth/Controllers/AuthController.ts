import Token from '@app/src/Shared/Domain/Services/Token/Token';
import BaseController from '@base-controller/BaseController';
import HttpError from '@exceptions/HttpError';
import { getNextDay } from '@shared/Date';
import bcrypt from 'bcryptjs';
import { Response, Request } from 'express';

import LoginModel from '../Models/AuthModel';
import PermissionsModel from '../Models/PermissionsModel';
import RolePermissionModel from '../Models/RolePermissionsModel';
import UserPermissionModel from '../Models/UserPermissionsModel';
import UserRolesModel from '../Models/UserRolesModel';

import {
  IPermissions,
  IUserPermissions,
  IUserRolesReturn,
} from './AuthController.types';

export default class AuthController extends BaseController {
  private loginModel: LoginModel;

  private jwt: Token;

  constructor() {
    super();
    this.loginModel = new LoginModel();
    this.jwt = new Token();
  }

  public async login(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const { email, password } = req.body;
      const user = await this.loginModel.getUserByEmail(email);
      if (user) {
        const isPwdValid = await bcrypt.compare(
          password,
          <string>user.password,
        );
        if (isPwdValid) {
          const userData = {
            id: user.id,
            name: `${user.user}`,
            email,
          };
          const { token } = this.jwt.generateToken(userData);
          const expiresIn = getNextDay();
          await this.deleteCache('users');
          return res.status(200).json({
            token,
            user_data: {
              name: userData.name,
              email,
            },
            expires_in: expiresIn,
          });
        }
      }
      throw new HttpError(403, 'Usuário ou senha inválidos.');
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async getProfilePermissions(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const { authorization } = req.headers;
      const { id } = this.getUser(authorization);
      const cache = await this.getCache(`admin-users-profile-${authorization}`);
      if (cache)
        return res.status(200).json({
          data: cache,
        });
      const userRoles = (await this.getRolesByUser(id)) || [];
      const isSuperAdmin = userRoles.find(role => role.name === 'superadmin');
      if (isSuperAdmin) {
        const permissions = await this.getPermissions();
        if (!permissions) return res.status(200).json({ data: [] });
        await this.createCache(
          `admin-users-profile-${authorization}`,
          permissions,
        );
        res.status(200).json({
          data: permissions,
        });
      }
      const userPermissions = (await this.getPermissionsByUser(id)) || [];
      const permissionsByRoleId = userPermissions.map(
        permissions => permissions.permission_id || 0,
      );

      const rolesId = userRoles.map(role => role.id);
      const permissionsRoles = await this.getPermissionsByRole(rolesId);

      const permissionsRolesAndPermissions = permissionsRoles?.concat(
        permissionsByRoleId.filter(permission => permission !== 0),
      );
      const permissions = [...new Set(permissionsRolesAndPermissions)];

      const permissionWithName = await this.getPermissionsById(permissions);

      if (!permissionWithName) {
        return res.status(200).json({ data: [] });
      }

      await this.createCache(
        `admin-users-profile-${authorization}`,
        permissionWithName,
      );
      return res.status(200).json({
        data: permissionWithName,
      });
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  private async getRolesByUser(
    userId: number,
  ): Promise<IUserRolesReturn[] | undefined> {
    try {
      const userRolesModel = new UserRolesModel();
      const roles = await userRolesModel.listRolesByUser(userId);
      return roles.map(role => ({
        id: role.role_id,
        name: role.RoleModel.name,
      }));
    } catch (error) {
      if (error instanceof HttpError) {
        throw new HttpError(error.statusCode, error.message);
      }
    }
  }

  private async getPermissionsByUser(
    userId: number,
  ): Promise<IUserPermissions[] | undefined> {
    try {
      const userPermissionsModel = new UserPermissionModel();
      return await userPermissionsModel.getUserPermissions(userId);
    } catch (error) {
      if (error instanceof HttpError) {
        throw new HttpError(error.statusCode, error.message);
      }
    }
  }

  private async getPermissionsByRole(
    roles: number[],
  ): Promise<number[] | undefined> {
    try {
      const rolePermissionsModel = new RolePermissionModel();
      const rolePermissions = await rolePermissionsModel.getPermissionsByRole(
        roles,
      );
      const permissions = rolePermissions.map(item => item.permission_id);
      return [...new Set(permissions)];
    } catch (error) {
      if (error instanceof HttpError) {
        throw new HttpError(error.statusCode, error.message);
      }
    }
  }

  private async getPermissionsById(
    permissionsId: number[],
  ): Promise<IPermissions[] | undefined> {
    try {
      const permissionsModel = new PermissionsModel();
      const permissionReturn = await permissionsModel.getPermissionsById(
        permissionsId,
      );
      const permissionsArray = permissionReturn.map(permission => {
        return {
          id: permission.id,
          name: permission.name,
          description: permission.description,
        };
      });
      return permissionsArray;
    } catch (error) {
      if (error instanceof HttpError) {
        throw new HttpError(error.statusCode, error.message);
      }
    }
  }

  private async getPermissions() {
    try {
      const permissionsModel = new PermissionsModel();
      const permissionReturn = await permissionsModel.getPermissions();
      return permissionReturn.map(permission => ({
        id: permission.id,
        name: permission.name,
        description: permission.description,
      }));
    } catch (error) {
      if (error instanceof HttpError) {
        throw new HttpError(error.statusCode, error.message);
      }
    }
  }
}
