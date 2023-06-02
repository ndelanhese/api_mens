import PaginationFactory from '@app/api/Shared/Factories/PaginationFactory';
import CreatePromotionAction from '@app/src/Promotions/Application/Actions/Promotions/CreatePromotionAction';
import DeletePromotionAction from '@app/src/Promotions/Application/Actions/Promotions/DeletePromotionAction';
import UpdatePromotionAction from '@app/src/Promotions/Application/Actions/Promotions/UpdatePromotionAction';
import BaseController from '@base-controller/BaseController';
import HttpError from '@exceptions/HttpError';
import { Request, Response } from 'express';

import CreatePromotionFactory from '../Factories/CreatePromotionFactory';
import DeletePromotionFactory from '../Factories/DeletePromotionFactory';
import UpdatePromotionDateFactory from '../Factories/UpdatePromotionDataFactory';
import UpdatePromotionFactory from '../Factories/UpdatePromotionFactory';
import PromotionsModel from '../Models/PromotionsModel';

export default class PromotionsController extends BaseController {
  public async getPromotions(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const cacheKey = `promotions-${JSON.stringify(req.query)}`;
      await this.verifyPermission(req, 'promotions_read');
      const cache = await this.getCache(cacheKey);
      if (cache) {
        return res.status(200).json(cache);
      }
      const { page, perPage } = PaginationFactory.fromRequest(req);
      const promotionsModel = new PromotionsModel();
      const promotions = await promotionsModel.getPromotions();
      const promotionsPaginated = this.dataPagination(
        page,
        perPage,
        promotions,
      );
      await this.createCache(cacheKey, promotionsPaginated);
      return res.status(200).json(promotionsPaginated);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async getPromotion(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const id = Number(req.params.id);
      const cacheKey = `promotions-${id}`;
      await this.verifyPermission(req, 'promotions_read');
      const cache = await this.getCache(cacheKey);
      if (cache) {
        return res.status(200).json(cache);
      }
      const promotionsModel = new PromotionsModel();
      const promotion = await promotionsModel.getPromotion(id);
      await this.createCache(cacheKey, promotion);
      return res.status(200).json(promotion);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async createPromotion(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'promotions_create');
      const promotionInputData = CreatePromotionFactory.fromRequest(req);
      const promotionAction = new CreatePromotionAction();
      const promotionId = (
        await promotionAction.execute(promotionInputData)
      ).getId();
      await this.deleteCache('promotions');
      return res.status(201).json(promotionId);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async deletePromotion(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'promotions_delete');
      const promotionInputData = DeletePromotionFactory.fromRequest(req);
      const promotionAction = new DeletePromotionAction();
      await promotionAction.execute(promotionInputData);
      await this.deleteCache('promotions');
      return res.status(204).send();
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async updatePromotion(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'promotions_update');
      const promotionInputData = UpdatePromotionFactory.fromRequest(req);
      const promotionAction = new UpdatePromotionAction();
      await promotionAction.execute(promotionInputData);
      await this.deleteCache('promotions');
      return res.status(204).send();
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async updatePromotionDate(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'promotions_update');
      const promotionInputData = UpdatePromotionDateFactory.fromRequest(req);
      const promotionAction = new UpdatePromotionAction();
      await promotionAction.execute(promotionInputData);
      await this.deleteCache('promotions');
      return res.status(204).send();
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }
}
