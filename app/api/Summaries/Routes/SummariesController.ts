import express, { Router } from 'express';

import SummariesController from '../Controllers/SummariesController';

export default class SummariesRoute {
  private summariesRoute: Router;

  private summariesController: SummariesController;

  constructor() {
    this.summariesRoute = express.Router();
    this.summariesController = new SummariesController();
    this.setup();
  }

  private setup(): void {
    const getTopProducts = this.summariesController.getTopProducts.bind(
      this.summariesController,
    );
    this.summaryRoute.get('/top-selling-products', getTopProducts);
  }

  get summaryRoute() {
    return this.summariesRoute;
  }
}
