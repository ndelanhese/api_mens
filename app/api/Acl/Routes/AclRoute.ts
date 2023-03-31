import express, { Router } from 'express';

import PermissionsController from '../Controllers/PermissionsController';
import RolesController from '../Controllers/RolesController';
import createRoleMiddleware from '../Middleware/CreateRoleMiddleware';
import deleteRoleMiddleware from '../Middleware/DeleteRoleMiddleware';
import updateRoleMiddleware from '../Middleware/UpdateRoleMiddleware';

export default class RolesRoute {
  private aclRoute: Router;

  private roleController: RolesController;
  private permissionsController: PermissionsController;

  constructor() {
    this.aclRoute = express.Router();
    this.roleController = new RolesController();
    this.permissionsController = new PermissionsController();
    this.setup();
  }

  private setup(): void {
    const getRoles = this.roleController.getRoles.bind(this.roleController);
    const getRole = this.roleController.getRole.bind(this.roleController);
    const creteRole = this.roleController.createRole.bind(this.roleController);
    const deleteRole = this.roleController.deleteRole.bind(this.roleController);
    const updateRole = this.roleController.updateRole.bind(this.roleController);
    const getPermissions = this.permissionsController.getPermissions.bind(
      this.permissionsController,
    );

    this.aclRoute.get('/roles', getRoles);
    this.aclRoute.get('/roles/:id', getRole);
    this.aclRoute.post('/roles', createRoleMiddleware, creteRole);
    this.aclRoute.delete('/roles/:id', deleteRoleMiddleware, deleteRole);
    this.aclRoute.put('/roles/:id', updateRoleMiddleware, updateRole);
    this.aclRoute.get('/permissions', getPermissions);
  }

  get aclRoutes() {
    return this.aclRoute;
  }
}
