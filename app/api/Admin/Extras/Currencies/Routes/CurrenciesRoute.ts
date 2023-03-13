import express, { Router } from 'express';
import CurrenciesController from '../Controllers/CurrenciesController';

export default class CurrenciesRoute {
  private currenciesRoute: Router;

  private currenciesController: CurrenciesController;

  constructor() {
    this.currenciesRoute = express.Router();
    this.currenciesController = new CurrenciesController();
    this.setup();
  }

  private setup(): void {
    const getCurrencies = this.currenciesController.getCurrencies.bind(
      this.currenciesController,
    );

    this.currenciesRoute.get('/', getCurrencies);
  }

  get currencyRoute() {
    return this.currenciesRoute;
  }
}
