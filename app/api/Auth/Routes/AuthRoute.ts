import express, { Router } from 'express';

import AuthController from '../Controllers/AuthController';

export default class AuthRoute {
  private auth: Router;

  private authController: AuthController;

  constructor() {
    this.auth = express.Router();
    this.authController = new AuthController();
    this.setup();
  }

  private setup(): void {
    const auth = this.authController.login.bind(this.authController);
    const permissions = this.authController.getProfilePermissions.bind(
      this.authController,
    );

    this.auth.post('/login', auth);
    this.auth.get('/permissions', permissions);
  }

  get authRoute() {
    return this.auth;
  }
}
