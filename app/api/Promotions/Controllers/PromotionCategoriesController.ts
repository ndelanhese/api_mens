import BaseController from '@app/api/Shared/Controllers/BaseController';
import CreatePromotionCategoryAction from '@app/src/Promotions/Application/Actions/PromotionsCategories/CreatePromotionCategoryAction';
import DeletePromotionCategoryAction from '@app/src/Promotions/Application/Actions/PromotionsCategories/DeletePromotionCategoryAction';
import UpdatePromotionCategoryAction from '@app/src/Promotions/Application/Actions/PromotionsCategories/UpdatePromotionCategoryAction';
import HttpError from '@exceptions/HttpError';
import { Request, Response } from 'express';

import CreatePromotionCategoryFactory from '../Factories/PromotionCategories/CreateCategoryFactory';
import DeletePromotionCategoryFactory from '../Factories/PromotionCategories/DeleteCategoryFactory';
import UpdatePromotionCategoryFactory from '../Factories/PromotionCategories/UpdateCategoryFactory';
import PromotionCategoriesModel from '../Models/PromotionsCategoriesModel';

export default class PromotionCategoriesController extends BaseController {
  public async getPromotionCategories(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'promotions_categories_read');
      const cacheKey = 'promotions_categories';
      const cache = await this.getCache(cacheKey);
      if (cache) return res.status(200).json(cache);
      const categoriesModel = new PromotionCategoriesModel();
      //TODO -> Retornar dentro do array de data
      const categories = await categoriesModel.getPromotionCategories();
      await this.createCache(cacheKey, categories);
      return res.status(200).json(categories);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async getPromotionCategory(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'promotions_categories_read');
      const { id } = req.params;
      const cacheKey = `promotions_categories-${id}`;
      const cache = await this.getCache(cacheKey);
      if (cache) return res.status(200).json(cache);
      const categoriesModel = new PromotionCategoriesModel();
      const category = await categoriesModel.getPromotionCategory(Number(id));
      await this.createCache(cacheKey, category);
      return res.status(200).json(category);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async createPromotionCategory(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'promotions_categories_create');
      const categoryInputData = CreatePromotionCategoryFactory.fromRequest(req);
      const categoryAction = new CreatePromotionCategoryAction();
      const categoryId = (
        await categoryAction.execute(categoryInputData)
      ).getId();
      await this.deleteCache('promotions_categories');
      return res.status(201).json(categoryId);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async updatePromotionCategory(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'promotions_categories_update');
      const userInputData = UpdatePromotionCategoryFactory.fromRequest(req);
      const userAction = new UpdatePromotionCategoryAction();
      const categoriesModel = new PromotionCategoriesModel();
      const currentPromotionCategories =
        await categoriesModel.getPromotionCategory(userInputData.id);
      const currentPromotionCategoriesInputData =
        UpdatePromotionCategoryFactory.fromCurrentPromotionCategory(
          currentPromotionCategories,
        );
      await userAction.execute(
        userInputData,
        currentPromotionCategoriesInputData,
      );
      await this.deleteCache('promotions_categories');
      return res.status(204).send();
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async deletePromotionCategory(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'promotions_categories_delete');
      const userInputData = DeletePromotionCategoryFactory.fromRequest(req);
      const userAction = new DeletePromotionCategoryAction();
      await userAction.execute(userInputData);
      await this.deleteCache('promotions_categories');
      return res.status(204).send();
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }
}
