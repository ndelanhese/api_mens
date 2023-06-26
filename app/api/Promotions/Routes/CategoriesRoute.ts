import express, { Router } from 'express';

import PromotionCategoriesController from '../Controllers/PromotionCategoriesController';
import createCategoryMiddleware from '../Middleware/PromotionCategories/CreateCategoryMiddleware';
import deleteCategoryMiddleware from '../Middleware/PromotionCategories/DeleteCategoryMiddleware';
import updateCategoryMiddleware from '../Middleware/PromotionCategories/UpdateCategoryMiddleware';

export default class PromotionsCategoriesRoute {
  private promotionsCategoriesRoute: Router;
  private promotionsCategoriesController: PromotionCategoriesController;

  constructor() {
    this.promotionsCategoriesRoute = express.Router();
    this.promotionsCategoriesController = new PromotionCategoriesController();
    this.setup();
  }

  private setup(): void {
    const getPromotionsCategories =
      this.promotionsCategoriesController.getPromotionCategories.bind(
        this.promotionsCategoriesController,
      );
    const getCategory =
      this.promotionsCategoriesController.getPromotionCategory.bind(
        this.promotionsCategoriesController,
      );
    const createCategory =
      this.promotionsCategoriesController.createPromotionCategory.bind(
        this.promotionsCategoriesController,
      );
    const deleteCategory =
      this.promotionsCategoriesController.deletePromotionCategory.bind(
        this.promotionsCategoriesController,
      );
    const updateCategory =
      this.promotionsCategoriesController.updatePromotionCategory.bind(
        this.promotionsCategoriesController,
      );

    this.promotionsCategoriesRoute.get('/', getPromotionsCategories);
    this.promotionsCategoriesRoute.get('/:id', getCategory);
    this.promotionsCategoriesRoute.post(
      '/',
      createCategoryMiddleware,
      createCategory,
    );
    this.promotionsCategoriesRoute.delete(
      '/:id',
      deleteCategoryMiddleware,
      deleteCategory,
    );
    this.promotionsCategoriesRoute.put(
      '/:id',
      updateCategoryMiddleware,
      updateCategory,
    );
  }

  get promotionCategoryRoute() {
    return this.promotionsCategoriesRoute;
  }
}
