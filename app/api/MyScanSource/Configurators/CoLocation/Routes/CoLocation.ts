import express, { Router } from 'express';
import createEquinixEstimateMiddleware from '../MIddleware/CreateEquinixEstimateMiddleware';
import EquinixController from '../Controllers/EquinixController';

export default class MyCoLocationConfiguratorRoute {
  private coLocationRoute: Router;

  private equinixController: EquinixController;

  constructor() {
    this.coLocationRoute = express.Router();
    this.equinixController = new EquinixController();
    this.setup();
  }

  private setup(): void {
    const getProducts = this.equinixController.getProducts.bind(
      this.equinixController,
    );
    const createEstimate = this.equinixController.createEstimate.bind(
      this.equinixController,
    );
    this.coLocationRoute.get('/equinix', getProducts);
    this.coLocationRoute.post(
      '/equinix',
      createEquinixEstimateMiddleware,
      createEstimate,
    );
  }

  get coLocationsRoute() {
    return this.coLocationRoute;
  }
}
