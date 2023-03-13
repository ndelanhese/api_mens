import express, { Router } from 'express';
import RolesController from '../Controllers/RolesController';
import createRoleMiddleware from '../Middleware/CreateRoleMiddleware';
import deleteRoleMiddleware from '../Middleware/DeleteRoleMiddleware';
import updateRoleMiddleware from '../Middleware/UpdateRoleMiddleware';

export default class RolesRoute {
  private rolesRoute: Router;

  private roleController: RolesController;

  constructor() {
    this.rolesRoute = express.Router();
    this.roleController = new RolesController();
    this.setup();
  }

  private setup(): void {
    const getRoles = this.roleController.getRoles.bind(this.roleController);
    const getRole = this.roleController.getRole.bind(this.roleController);
    const creteRole = this.roleController.createRole.bind(this.roleController);
    const deleteRole = this.roleController.deleteRole.bind(this.roleController);
    const updateRole = this.roleController.updateRole.bind(this.roleController);

    this.roleRoute.get('/', getRoles);
    this.roleRoute.get('/:id', getRole);
    this.roleRoute.post('/', createRoleMiddleware, creteRole);
    this.roleRoute.delete('/:id', deleteRoleMiddleware, deleteRole);
    this.roleRoute.put('/:id', updateRoleMiddleware, updateRole);
  }

  get roleRoute() {
    return this.rolesRoute;
  }
}
