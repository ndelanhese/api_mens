import express, { Router } from 'express';

import DiscountTypesController from '../Controllers/DiscountTypesSelectController';

export default class DiscountTypesRoute {
  private discountTypes: Router;

  private statesController: DiscountTypesController;

  constructor() {
    this.discountTypes = express.Router();
    this.statesController = new DiscountTypesController();
    this.setup();
  }

  private setup(): void {
    const getDiscountTypes = this.statesController.getDiscountTypes.bind(
      this.statesController,
    );

    this.discountTypes.get('/', getDiscountTypes);
  }

  get discountTypeRoute() {
    return this.discountTypes;
  }
}
