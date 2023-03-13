import express, { Router } from 'express';
import LoginController from '../Controllers/LoginController';

export default class LoginRoute {
  private auth: Router;

  private loginController: LoginController;

  constructor() {
    this.auth = express.Router();
    this.loginController = new LoginController();
    this.setup();
  }

  private setup(): void {
    const login = this.loginController.login.bind(this.loginController);

    this.auth.post('/', login);
  }

  get loginRoute() {
    return this.auth;
  }
}
