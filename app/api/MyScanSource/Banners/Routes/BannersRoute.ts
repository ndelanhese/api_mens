import express, { Router } from 'express';
import BannersController from '../Controllers/BannersController';

export default class BannersRoute {
  private bannersRoute: Router;

  private bannersController: BannersController;

  constructor() {
    this.bannersRoute = express.Router();
    this.bannersController = new BannersController();

    this.setup();
  }

  private setup(): void {
    const getBanners = this.bannersController.getBanners.bind(
      this.bannersController,
    );

    this.bannerRoute.get('/', getBanners);
  }

  get bannerRoute() {
    return this.bannersRoute;
  }
}
