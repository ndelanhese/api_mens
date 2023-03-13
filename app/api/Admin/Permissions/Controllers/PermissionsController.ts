import { Request, Response } from 'express';
import HttpError from '@exceptions/HttpError';
import PermissionsModel from '../Models/PermissionsModel';
import { IPermission, GroupedObjects } from './PermissionsController.types';
import BaseController from '@admin-base-controller/BaseController';

export default class PermissionsController extends BaseController {
  private permissionsModel: PermissionsModel;

  constructor() {
    super();
    this.permissionsModel = new PermissionsModel();
  }

  public async getPermissions(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      this.verifyPermission(req, 'permission_read');
      const cache = await this.getCache('admin-permissions');
      if (cache) return res.status(200).json(cache);
      const data = this.orderPermissions(await this.permissionsModel.findAll());
      await this.createCache('admin-permissions', data);
      return res.status(200).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async getPermissionByPk(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      this.verifyPermission(req, 'permission_read');
      const { id } = req.params;
      const cache = await this.getCache(`admin-permission-${id}`);
      if (cache) return res.status(200).json(cache);
      const permission = await this.permissionsModel.getPermissionByPk(
        Number(id),
      );
      await this.createCache(`admin-permission-${id}`, permission);
      return res.status(200).json(permission);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

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
}
