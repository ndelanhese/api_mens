import BaseController from '@base-controller/BaseController';
import HttpError from '@exceptions/HttpError';
import { Request, Response } from 'express';

import PermissionsModel from '../Models/PermissionsModel';

import { IPermission, IGroup } from './PermissionsController.types';

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
      this.verifyPermission(req, 'acl_read');
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

  private orderPermissions(permissions: IPermission[]) {
    const groups: IGroup[] = [];
    permissions.forEach(permission => {
      let indexPosition = groups.findIndex(
        group => group.group_name === permission.group,
      );
      if (indexPosition === -1) {
        groups.push({
          group_name: permission.group,
          permissions: [],
        });
        indexPosition = groups.length - 1;
      }
      groups[indexPosition].permissions.push(permission);
    });
    return groups;
  }
}
