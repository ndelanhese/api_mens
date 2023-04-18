import Token from '@app/src/Shared/Domain/Services/Token/Token';
import { getCache, createCache, createCacheClient } from '@cache/Cache';
import HttpError from '@exceptions/HttpError';
import HttpErrorNotAuthorized from '@exceptions/NotAuthorizedHttpError';

import PermissionsModel from '../Models/PermissionsModel';
import RolePermissionModel from '../Models/RolePermissionsModel';
import UserPermissionModel from '../Models/UserPermissionsModel';
import UserRolesModel from '../Models/UserRolesModel';

import {
  IPermissions,
  IPermissionsReturn,
  IUserPermissions,
  IUserRolesReturn,
} from './User.types';

export default class AclService {
  public async getProfilePermissions(
    authorization: string,
  ): Promise<IPermissionsReturn[] | string> {
    try {
      const cacheClient = createCacheClient();
      const { id } = Token.deserializeAdminToken(authorization);
      const cache = await getCache(
        cacheClient,
        `admin-users-profile-${authorization}`,
      );
      if (cache) return JSON.stringify(cache);
      const userRoles = (await this.getRolesByUser(id)) || [];
      const isSuperAdmin = userRoles.find(role => role.name === 'superadmin');
      if (isSuperAdmin) {
        const permissions = await this.getPermissions();
        if (!permissions) return [];
        await createCache(
          cacheClient,
          `admin-users-profile-${authorization}`,
          permissions,
        );
        return userRoles;
      }
      const userPermissions = (await this.getPermissionsByUser(id)) || [];
      const permissionsByRoleId = userPermissions.map(
        permissions => permissions.permission_id || 0,
      );
      const rolesIds = userRoles.map(role => role.id);
      const permissionsRoles = await this.getPermissionsByRole(rolesIds);
      const permissionsRolesAndPermissions = permissionsRoles?.concat(
        permissionsByRoleId.filter(permission => permission !== 0),
      );
      const permissions = [...new Set(permissionsRolesAndPermissions)];
      const permissionWithName = await this.getPermissionsById(permissions);
      if (!permissionWithName) {
        throw new HttpErrorNotAuthorized();
      }
      await createCache(
        cacheClient,
        `admin-users-profile-${authorization}`,
        permissionWithName,
      );
      return permissionWithName;
    } catch {
      throw new HttpErrorNotAuthorized();
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
        description: role.RoleModel.description,
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

  private async getPermissions() {
    try {
      const permissionsModel = new PermissionsModel();
      const permissionReturn = await permissionsModel.getPermissions();
      return permissionReturn.map(permission => ({
        id: permission.id,
        name: permission.name,
        description: permission.description,
        group: permission.group,
      }));
    } catch (error) {
      if (error instanceof HttpError) {
        throw new HttpError(error.statusCode, error.message);
      }
    }
  }
}
