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
    const createPromotion = this.promotionsController.createPromotion.bind(
      this.promotionsController,
    );
    const updatePromotion = this.promotionsController.updatePromotion.bind(
      this.promotionsController,
    );
    const updatePromotionDate =
      this.promotionsController.updatePromotionDate.bind(
        this.promotionsController,
      );
    const deletePromotion = this.promotionsController.deletePromotion.bind(
      this.promotionsController,
    );

    //TODO-> Adicionar middleware
    this.promotionRoute.get('/', getPromotions);
    this.promotionRoute.get('/:id', getPromotion);
    this.promotionRoute.post('/', createPromotion);
    this.promotionRoute.put('/:id/date', updatePromotionDate);
    this.promotionRoute.put('/:id', updatePromotion);
    this.promotionRoute.delete('/:id', deletePromotion);
  }

  get promotionRoute() {
    return this.promotionsRoute;
  }
}
