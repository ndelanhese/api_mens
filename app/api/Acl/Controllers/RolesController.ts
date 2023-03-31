import CreateRoleAction from '@app/src/Roles/Application/Actions/CreateRoleAction';
import DeleteRoleAction from '@app/src/Roles/Application/Actions/DeleteRoleAction';
import UpdateRoleAction from '@app/src/Roles/Application/Actions/UpdateRoleAction';
import BaseController from '@base-controller/BaseController';
import HttpError from '@exceptions/HttpError';
import { Request, Response } from 'express';

import CreateRoleFactory from '../Factories/CreateRoleFactory';
import DeleteRoleFactory from '../Factories/DeleteRoleFactory';
import UpdateRoleFactory from '../Factories/UpdateRoleFactory';
import RolesModel from '../Models/RolesModel';

export default class RolesController extends BaseController {
  private rolesModel: RolesModel;

  constructor() {
    super();
    this.rolesModel = new RolesModel();
  }

  public async getRoles(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'acl_read');
      const cache = await this.getCache('admin-roles');
      if (cache) {
        return res.status(200).json(cache);
      }
      const roles = await this.rolesModel.getRoles();
      await this.createCache('admin-roles', roles);
      return res.status(200).json(roles);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async getRole(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'acl_read');
      const { id } = req.params;
      const cache = await this.getCache(`admin-roles-${id}`);
      if (cache) {
        return res.status(200).json(cache);
      }
      const role = await this.rolesModel.getRoleById(Number(id));
      await this.createCache(`admin-roles-${id}`, role);
      return res.status(200).json(role);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async createRole(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'acl_create');
      const roleInputData = CreateRoleFactory.fromRequest(req);
      const roleAction = new CreateRoleAction();
      const roleId = (await roleAction.execute(roleInputData)).getId();
      await this.deleteCache('roles');
      return res.status(200).json(roleId);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }
  public async deleteRole(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'acl_delete');
      const roleInputData = DeleteRoleFactory.fromRequest(req);
      await this.rolesModel.getRoleById(roleInputData.id);
      const roleAction = new DeleteRoleAction();
      await roleAction.execute(roleInputData);
      await this.deleteCache('roles');
      return res.status(200).json('Papel deletado com sucesso.');
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }
  public async updateRole(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'acl_update');
      const roleInputData = UpdateRoleFactory.fromRequest(req);
      const currentRole = await this.rolesModel.getRoleById(roleInputData.id);
      const currentRoleInputData =
        UpdateRoleFactory.fromCurrentRole(currentRole);
      const roleAction = new UpdateRoleAction();
      const role = await roleAction.execute(
        roleInputData,
        currentRoleInputData,
      );
      await this.deleteCache('roles');
      return res.status(200).json(role);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }
}
