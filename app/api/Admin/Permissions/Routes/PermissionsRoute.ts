import express, { Router } from 'express';
import PermissionsController from '../Controllers/PermissionsController';

export default class PermissionsRoute {
  private permissionsRoute: Router;

  private permissionsController: PermissionsController;

  constructor() {
    this.permissionsRoute = express.Router();
    this.permissionsController = new PermissionsController();
    this.setup();
  }

  private setup(): void {
    const getPermissions = this.permissionsController.getPermissions.bind(
      this.permissionsController,
    );
    const show = this.permissionsController.getPermissionByPk.bind(
      this.permissionsController,
    );

    this.permissionsRoute.get('/', getPermissions);
    this.permissionsRoute.get('/:id', show);
  }

  get permissionRoute() {
    return this.permissionsRoute;
  }
}
