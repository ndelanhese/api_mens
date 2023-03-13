import express, { Router } from 'express';
import GoToController from '../Controllers/GoToController';
import createGoToEstimateMiddleware from '../MIddleware/CreateGoToEstimateMiddleware';

export default class MyPabxCloudConfiguratorRoute {
  private productsRoute: Router;

  private goToController: GoToController;

  constructor() {
    this.productsRoute = express.Router();
    this.goToController = new GoToController();
    this.setup();
  }

  private setup(): void {
    const getProducts = this.goToController.getProducts.bind(
      this.goToController,
    );
    const createEstimate = this.goToController.createEstimate.bind(
      this.goToController,
    );
    this.productsRoute.get('/goto', getProducts);
    this.productsRoute.post(
      '/goto',
      createGoToEstimateMiddleware,
      createEstimate,
    );
  }

  get pabxCloudController() {
    return this.productsRoute;
  }
}
