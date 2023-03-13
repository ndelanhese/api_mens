import express, { Router } from 'express';
import EstimatesController from '../Controllers/EstimatesController';

export default class EstimatesRoute {
  private estimatesRoute: Router;

  private estimatesController: EstimatesController;

  constructor() {
    this.estimatesRoute = express.Router();
    this.estimatesController = new EstimatesController();
    this.setup();
  }

  private setup(): void {
    const getEstimates = this.estimatesController.getEstimates.bind(
      this.estimatesController,
    );
    const getEstimate = this.estimatesController.getEstimate.bind(
      this.estimatesController,
    );

    this.estimatesRoute.get('/', getEstimates);
    this.estimatesRoute.get('/:id', getEstimate);
  }

  get estimateRoute() {
    return this.estimatesRoute;
  }
}
