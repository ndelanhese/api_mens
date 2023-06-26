import express, { Router } from 'express';

import PromotionsController from '../Controllers/PromotionsController';
import createPromotionMiddleware from '../Middleware/Promotions/CreatePromotionMiddleware';
import deletePromotionMiddleware from '../Middleware/Promotions/DeletePromotionMiddleware';
import updatePromotionDateMiddleware from '../Middleware/Promotions/UpdatePromotionDateMiddleware';
import updatePromotionMiddleware from '../Middleware/Promotions/UpdatePromotionMiddleware';

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
    const getPromotionStatus = this.promotionsController.getStatus.bind(
      this.promotionsController,
    );
    const getPromotionDiscountType =
      this.promotionsController.getDiscountTypes.bind(
        this.promotionsController,
      );

    this.promotionRoute.get('/status', getPromotionStatus);
    this.promotionRoute.get('/discount-types', getPromotionDiscountType);
    this.promotionRoute.get('/', getPromotions);
    this.promotionRoute.get('/:id', getPromotion);
    this.promotionRoute.post('/', createPromotionMiddleware, createPromotion);
    this.promotionRoute.put(
      '/:id/date',
      updatePromotionDateMiddleware,
      updatePromotionDate,
    );
    this.promotionRoute.put('/:id', updatePromotionMiddleware, updatePromotion);
    this.promotionRoute.delete(
      '/:id',
      deletePromotionMiddleware,
      deletePromotion,
    );
  }

  get promotionRoute() {
    return this.promotionsRoute;
  }
}
