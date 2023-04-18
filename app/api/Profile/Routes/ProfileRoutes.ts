import express, { Router } from 'express';

import ProfileController from '../Controllers/ProfileController';

export default class ProfileRoute {
  private profileRoutes: Router;

  private profileController: ProfileController;

  constructor() {
    this.profileRoutes = express.Router();
    this.profileController = new ProfileController();
    this.setup();
  }

  private setup(): void {
    const profile = this.profileController.getProfile.bind(
      this.profileController,
    );
    this.profileRoute.get('/', profile);
  }

  get profileRoute() {
    return this.profileRoutes;
  }
}
