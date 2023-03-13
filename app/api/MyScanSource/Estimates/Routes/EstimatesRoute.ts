import express, { Router } from 'express';
import EstimatesController from '../Controllers/EstimatesController';
import createEstimateMiddleware from '../Middleware/CreateEstimateMiddleware';

export default class EstimatesRoute {
  private estimatesRoute: Router;

  private estimatesController: EstimatesController;

  constructor() {
    this.estimatesRoute = express.Router();
    this.estimatesController = new EstimatesController();
    this.setup();
  }

  private setup(): void {
    const createEstimate = this.estimatesController.createEstimate.bind(
      this.estimatesController,
    );

    this.estimatesRoute.post(
      '/create',
      createEstimateMiddleware,
      createEstimate,
    );
  }

  get estimateRoute() {
    return this.estimatesRoute;
  }
}
