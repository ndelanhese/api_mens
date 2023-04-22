import express, { Router } from 'express';

import CustomersController from '../Controllers/CustomersController';

export default class CustomersRoute {
  private customersRoute: Router;

  private customerController: CustomersController;

  constructor() {
    this.customersRoute = express.Router();
    this.customerController = new CustomersController();
    this.setup();
  }

  private setup(): void {
    const getCustomers = this.customerController.getCustomers.bind(
      this.customerController,
    );

    this.customersRoute.get('/', getCustomers);
  }

  get customerRoute() {
    return this.customersRoute;
  }
}
