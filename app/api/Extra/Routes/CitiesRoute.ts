import express, { Router } from 'express';

import CitiesController from '../Controllers/CitiesController';
import GetCitiesMiddleware from '../Middlewares/GetCitiesMiddleware';

export default class CitiesRoute {
  private citiesRoute: Router;

  private citiesController: CitiesController;

  constructor() {
    this.citiesRoute = express.Router();
    this.citiesController = new CitiesController();
    this.setup();
  }

  private setup(): void {
    const getCities = this.citiesController.getCities.bind(
      this.citiesController,
    );

    this.citiesRoute.get('/', GetCitiesMiddleware, getCities);
  }

  get cityRoute() {
    return this.citiesRoute;
  }
}
