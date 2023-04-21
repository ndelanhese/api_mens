import express, { Router } from 'express';

import StatesController from '../Controllers/StatesController';

export default class StatesRoute {
  private statesRoute: Router;

  private statesController: StatesController;

  constructor() {
    this.statesRoute = express.Router();
    this.statesController = new StatesController();
    this.setup();
  }

  private setup(): void {
    const getStates = this.statesController.getStates.bind(
      this.statesController,
    );

    this.statesRoute.get('/', getStates);
  }

  get stateRoute() {
    return this.statesRoute;
  }
}
