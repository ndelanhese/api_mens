import express, { Router } from 'express';

import PromotionsController from '../Controllers/PromotionsController';

export default class PromotionsRoute {
  private promotionsRoute: Router;

  private promotionsController: PromotionsController;

  constructor() {
    this.promotionsRoute = express.Router();
    this.promotionsController = new PromotionsController();
    this.setup();
  }

  private setup(): void {
    const getPromotions = this.promotionsController.getPromotions.bind(
      this.promotionsController,
    );
    const getPromotion = this.promotionsController.getPromotion.bind(
      this.promotionsController,
    );

    this.promotionRoute.get('/', getPromotions);
    this.promotionRoute.get('/:id', getPromotion);
  }

  get promotionRoute() {
    return this.promotionsRoute;
  }
}
