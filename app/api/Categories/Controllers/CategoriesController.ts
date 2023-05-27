import CreateCategoryAction from '@app/src/Categories/Application/Actions/CreateCategoryAction';
import DeleteCategoryAction from '@app/src/Categories/Application/Actions/DeleteCategoryAction';
import UpdateCategoryAction from '@app/src/Categories/Application/Actions/UpdateCategoryAction';
import BaseController from '@base-controller/BaseController';
import HttpError from '@exceptions/HttpError';
import { Request, Response } from 'express';

import CreateCategoryFactory from '../Factories/CreateCategoryFactory';
import DeleteCategoryFactory from '../Factories/DeleteCategoryFactory';
import UpdateCategoryFactory from '../Factories/UpdateCategoryFactory';
import CategoriesModel from '../Models/CategoriesModel';

export default class CategoriesController extends BaseController {
  public async getCategories(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'categories_read');
      const cacheKey = 'categories';
      const cache = await this.getCache(cacheKey);
      if (cache) return res.status(200).json(cache);
      const categoriesModel = new CategoriesModel();
      const categories = await categoriesModel.getCategories();
      await this.createCache(cacheKey, categories);
      return res.status(200).json(categories);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async getCategory(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'categories_read');
      const { id } = req.params;
      const cacheKey = `categories-${id}`;
      const cache = await this.getCache(cacheKey);
      if (cache) return res.status(200).json(cache);
      const categoriesModel = new CategoriesModel();
      const category = await categoriesModel.getCategory(Number(id));
      await this.createCache(cacheKey, category);
      return res.status(200).json(category);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async createCategory(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'categories_create');
      const categoryInputData = CreateCategoryFactory.fromRequest(req);
      const categoryAction = new CreateCategoryAction();
      const categoryId = (
        await categoryAction.execute(categoryInputData)
      ).getId();
      await this.deleteCache('categories');
      return res.status(201).json(categoryId);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async updateCategory(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'categories_update');
      const userInputData = UpdateCategoryFactory.fromRequest(req);
      const userAction = new UpdateCategoryAction();
      const categoriesModel = new CategoriesModel();
      const currentCategories = await categoriesModel.getCategory(
        userInputData.id,
      );
      const currentCategoriesInputData =
        UpdateCategoryFactory.fromCurrentCategory(currentCategories);
      await userAction.execute(userInputData, currentCategoriesInputData);
      await this.deleteCache('categories');
      return res.status(204).send();
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async deleteCategory(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'categories_delete');
      const userInputData = DeleteCategoryFactory.fromRequest(req);
      const userAction = new DeleteCategoryAction();
      await userAction.execute(userInputData);
      await this.deleteCache('categories');
      return res.status(204).send();
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }
}
