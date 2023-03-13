import RolePermissionModel from '../Models/RolePermissionsModel';
import { Response, Request } from 'express';
import HttpError from '@exceptions/HttpError';
import UserPermissionModel from '../Models/UserPermissionsModel';
import BaseController from '@admin-base-controller/BaseController';
import UserRolesModel from '../Models/UserRolesModel';
import {
  GroupedObjects,
  IPermission,
  IPermissions,
  IUserPermissions,
  IUserRolesReturn,
  IUserPermission,
} from './ProfileController.types';
import PermissionsModel from '../Models/PermissionsModel';

export default class ProfileController extends BaseController {
  public async getProfile(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      return res.status(200).json(this.getUser(req.headers.authorization));
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
      await this.verifyPermission(req, 'permission_read');
      const { authorization } = req.headers;
      const { id } = this.getUser(authorization);
      const cache = await this.getCache(`admin-profile-${authorization}`);
      if (cache)
        return res.status(200).json({
          data: cache,
        });
      const userRoles = (await this.getRolesByUser(id)) || [];
      const userPermissions = (await this.getPermissionsByUser(id)) || [];
      const permissionsByRoleId = userPermissions.map(
        (permissions) => permissions.permission_id || 0,
      );

      const rolesId = userRoles.map((role) => role.role_id);
      const permissionsRoles = await this.getPermissionsByRole(rolesId);

      const permissionsRolesAndPermissions = permissionsRoles?.concat(
        permissionsByRoleId.filter((permission) => permission !== 0),
      );
      const permissions = [...new Set(permissionsRolesAndPermissions)];

      const permissionWithName = await this.getPermissionsById(permissions);

      if (!permissionWithName) {
        return res.status(200).json([]);
      }
      const permissionsByGroups = this.orderPermissions(permissionWithName);

      this.createCache(`admin-profile-${authorization}`, permissionsByGroups);
      return res.status(200).json({
        data: permissionsByGroups,
      });
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }
  public async getProfilePermissionsByUser(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'roles_read');
      await this.verifyPermission(req, 'permission_read');
      const { authorization } = req.headers;
      const { id } = this.getUser(authorization);
      const cache = await this.getCache(`admin-profile-user-${id}`);
      if (cache)
        return res.status(200).json({
          data: cache,
        });
      const userRoles = (await this.getRolesByUser(id)) || [];
      const userPermissions = (await this.getPermissionsByUser(id)) || [];

      const permissionsByRoleId = userPermissions.map(
        (permissions) => permissions.permission_id || 0,
      );

      const rolesId = userRoles.map((role) => role.role_id);
      const permissionsRoles = await this.getPermissionsByRole(rolesId);

      const permissionsRolesAndPermissions = permissionsRoles?.concat(
        permissionsByRoleId.filter((permission) => permission !== 0),
      );

      const permissions = [...new Set(permissionsRolesAndPermissions)];

      const permissionWithName = await this.getPermissionsById(permissions);

      if (!permissionWithName) {
        return res.status(200).json([]);
      }

      const permissionsByGroup = this.UserPermissions(permissionWithName);

      this.createCache(`admin-profile-user${id}`, permissionsByGroup);
      return res.status(200).json({
        data: permissionsByGroup,
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
      return await userRolesModel.listRolesPermissionsByUser(userId);
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
      const permissions = rolePermissions.map((item) => item.permission_id);
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
      const permissionsArray = permissionReturn.map((permission) => {
        return {
          id: permission.id,
          name: permission.name,
          description: permission.description,
          group: permission.group,
        };
      });
      return permissionsArray;
    } catch (error) {
      if (error instanceof HttpError) {
        throw new HttpError(error.statusCode, error.message);
      }
    }
  }

  private verifyCheckedPermission = (
    allPermissions: number,
    qtdPermissions: number,
  ) => {
    if (qtdPermissions === allPermissions) {
      return {
        checked: true,
        partialChecked: false,
      };
    }
    return { checked: false, partialChecked: true };
  };

  private orderPermissions(permissions: IPermission[] | []) {
    const groupedPermissions: GroupedObjects = {};
    permissions.forEach((permission) => {
      if (!groupedPermissions[permission.group]) {
        groupedPermissions[permission.group] = [];
      }
      groupedPermissions[permission.group].push(permission);
    });
    return groupedPermissions;
  }

  private UserPermissions = (userPermissions: IUserPermission[]) => {
    const permissionsObject = userPermissions.reduce(
      (prev, value) => ({ ...prev, [value.id]: { checked: true } }),
      {},
    );

    const permissionsByGroups = this.orderPermissions(userPermissions);

    const permissionsGroups = {
      ...(permissionsByGroups?.users?.length > 0
        ? {
            users: this.verifyCheckedPermission(
              7,
              permissionsByGroups.users.length,
            ),
          }
        : false),
      ...(permissionsByGroups?.roles?.length > 0
        ? {
            roles: this.verifyCheckedPermission(
              4,
              permissionsByGroups.roles.length,
            ),
          }
        : false),
      ...(permissionsByGroups?.permissions?.length > 0
        ? {
            permissions: this.verifyCheckedPermission(
              2,
              permissionsByGroups.permissions.length,
            ),
          }
        : false),

      ...(permissionsByGroups?.ARGOX?.length > 0
        ? {
            ARGOX: this.verifyCheckedPermission(
              6,
              permissionsByGroups.ARGOX.length,
            ),
          }
        : false),

      ...(permissionsByGroups?.DATALOGIC?.length > 0
        ? {
            DATALOGIC: this.verifyCheckedPermission(
              6,
              permissionsByGroups.DATALOGIC.length,
            ),
          }
        : false),

      ...(permissionsByGroups?.DIMEP?.length > 0
        ? {
            DIMEP: this.verifyCheckedPermission(
              6,
              permissionsByGroups.DIMEP.length,
            ),
          }
        : false),

      ...(permissionsByGroups?.ELGIN_BEMATECH?.length > 0
        ? {
            ELGIN_BEMATECH: this.verifyCheckedPermission(
              6,
              permissionsByGroups.ELGIN_BEMATECH.length,
            ),
          }
        : false),

      ...(permissionsByGroups?.ELO?.length > 0
        ? {
            ELO: this.verifyCheckedPermission(
              6,
              permissionsByGroups.ELO.length,
            ),
          }
        : false),

      ...(permissionsByGroups?.EPSON?.length > 0
        ? {
            EPSON: this.verifyCheckedPermission(
              6,
              permissionsByGroups.EPSON.length,
            ),
          }
        : false),

      ...(permissionsByGroups?.GERBO?.length > 0
        ? {
            GERBO: this.verifyCheckedPermission(
              6,
              permissionsByGroups.GERBO.length,
            ),
          }
        : false),

      ...(permissionsByGroups?.GERTEC?.length > 0
        ? {
            GERTEC: this.verifyCheckedPermission(
              6,
              permissionsByGroups.GERTEC.length,
            ),
          }
        : false),

      ...(permissionsByGroups?.GTS?.length > 0
        ? {
            GTS: this.verifyCheckedPermission(
              6,
              permissionsByGroups.GTS.length,
            ),
          }
        : false),

      ...(permissionsByGroups?.HONEYWELL?.length > 0
        ? {
            HONEYWELL: this.verifyCheckedPermission(
              6,
              permissionsByGroups.HONEYWELL.length,
            ),
          }
        : false),

      ...(permissionsByGroups?.LOGIC_CONTROLS?.length > 0
        ? {
            LOGIC_CONTROLS: this.verifyCheckedPermission(
              6,
              permissionsByGroups.LOGIC_CONTROLS.length,
            ),
          }
        : false),

      ...(permissionsByGroups?.MENNO?.length > 0
        ? {
            MENNO: this.verifyCheckedPermission(
              6,
              permissionsByGroups.MENNO.length,
            ),
          }
        : false),

      ...(permissionsByGroups?.MONUS?.length > 0
        ? {
            MONUS: this.verifyCheckedPermission(
              6,
              permissionsByGroups.MONUS.length,
            ),
          }
        : false),

      ...(permissionsByGroups?.POSTECH?.length > 0
        ? {
            POSTECH: this.verifyCheckedPermission(
              6,
              permissionsByGroups.POSTECH.length,
            ),
          }
        : false),

      ...(permissionsByGroups?.TANCA?.length > 0
        ? {
            TANCA: this.verifyCheckedPermission(
              6,
              permissionsByGroups.TANCA.length,
            ),
          }
        : false),

      ...(permissionsByGroups?.ZEBRA?.length > 0
        ? {
            ZEBRA: this.verifyCheckedPermission(
              6,
              permissionsByGroups.ZEBRA.length,
            ),
          }
        : false),
      ...(permissionsByGroups?.banners?.length > 0
        ? {
            banners: this.verifyCheckedPermission(
              5,
              permissionsByGroups.banners.length,
            ),
          }
        : false),
    };

    return {
      ...permissionsObject,
      ...permissionsGroups,
    };
  };
}
