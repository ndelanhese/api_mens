import express, { Router } from 'express';
import createCyberpassEstimateMiddleware from '../MIddleware/CreateCyberpassEstimateMiddleware';
import CyberpassController from '../Controllers/CyberpassController';

export default class MyCyberpassConfiguratorRoute {
  private cyberpassRoute: Router;

  private cyberpassController: CyberpassController;

  constructor() {
    this.cyberpassRoute = express.Router();
    this.cyberpassController = new CyberpassController();
    this.setup();
  }

  private setup(): void {
    const getProducts = this.cyberpassController.getProducts.bind(
      this.cyberpassController,
    );
    const createEstimate = this.cyberpassController.createEstimate.bind(
      this.cyberpassController,
    );
    this.cyberpassRoute.get('/', getProducts);
    this.cyberpassRoute.post(
      '/',
      createCyberpassEstimateMiddleware,
      createEstimate,
    );
  }

  get MyCyberpassRoute() {
    return this.cyberpassRoute;
  }
}
