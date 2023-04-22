import express, { Router } from 'express';

import CategoriesController from '../Controllers/CategoriesController';
import createCategoryMiddleware from '../Middleware/CreateCategoryMiddleware';
import deleteCategoryMiddleware from '../Middleware/DeleteCategoryMiddleware';
import updateCategoryMiddleware from '../Middleware/UpdateCategoryMiddleware';

export default class CategoriesRoute {
  private categoriesRoute: Router;
  private categoriesController: CategoriesController;

  constructor() {
    this.categoriesRoute = express.Router();
    this.categoriesController = new CategoriesController();
    this.setup();
  }

  private setup(): void {
    const getCategories = this.categoriesController.getCategories.bind(
      this.categoriesController,
    );
    const getCategory = this.categoriesController.getCategory.bind(
      this.categoriesController,
    );

    const createCategory = this.categoriesController.createCategory.bind(
      this.categoriesController,
    );
    const deleteCategory = this.categoriesController.deleteCategory.bind(
      this.categoriesController,
    );
    const updateCategory = this.categoriesController.updateCategory.bind(
      this.categoriesController,
    );
    this.categoriesRoute.get('/', getCategories);
    this.categoriesRoute.get('/:id', getCategory);
    this.categoriesRoute.post('/', createCategoryMiddleware, createCategory);
    this.categoriesRoute.delete(
      '/:id',
      deleteCategoryMiddleware,
      deleteCategory,
    );
    this.categoriesRoute.put('/:id', updateCategoryMiddleware, updateCategory);
  }

  get categoryRoute() {
    return this.categoriesRoute;
  }
}
