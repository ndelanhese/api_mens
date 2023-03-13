import express, { Router } from 'express';
import UserController from '../Controllers/UserController';

export default class UsersRoute {
  private user: Router;

  private userController: UserController;

  constructor() {
    this.user = express.Router();
    this.userController = new UserController();
    this.setup();
  }

  private setup(): void {
    const user = this.userController.getUserByToken.bind(this.userController);

    this.user.get('/', user);
  }

  get userRoute() {
    return this.user;
  }
}
