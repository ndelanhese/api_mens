import ListFactory from '@app/api/Shared/Factories/ListFactory';
import CreatePromotionAction from '@app/src/Promotions/Application/Actions/Promotions/CreatePromotionAction';
import DeletePromotionAction from '@app/src/Promotions/Application/Actions/Promotions/DeletePromotionAction';
import UpdatePromotionAction from '@app/src/Promotions/Application/Actions/Promotions/UpdatePromotionAction';
import { DiscountTypes } from '@app/src/Promotions/Domain/Enums/DiscountTypes';
import { PromotionStatusTypes } from '@app/src/Promotions/Domain/Enums/PromotionStatusTypes';
import { formatLocaleDateString } from '@app/src/Shared/Infrastructure/Utils/Date';
import { formatDiscount } from '@app/src/Shared/Infrastructure/Utils/helpers/discountFormatter';
import BaseController from '@base-controller/BaseController';
import HttpError from '@exceptions/HttpError';
import { Request, Response } from 'express';

import CreatePromotionFactory from '../Factories/Promotions/CreatePromotionFactory';
import DeletePromotionFactory from '../Factories/Promotions/DeletePromotionFactory';
import UpdatePromotionDateFactory from '../Factories/Promotions/UpdatePromotionDataFactory';
import UpdatePromotionFactory from '../Factories/Promotions/UpdatePromotionFactory';
import PromotionsModel from '../Models/PromotionsModel';

import { Promotion } from './PromotionsController.types';

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
      // const { page, perPage } = PaginationFactory.fromRequest(req);
      const { status } = ListFactory.fromRequest(req);
      const promotionsModel = new PromotionsModel();
      const promotions: Promotion[] = await promotionsModel.getPromotions(
        status,
      );
      const formattedPromotions = promotions.map(promotion => {
        return this.formatPromotion(promotion);
      });
      const promotionsPaginated = this.returnInData(formattedPromotions);
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
      const promotion: unknown = await promotionsModel.getPromotion(id);
      const formattedPromotion = this.formatPromotion(promotion as Promotion);
      await this.createCache(cacheKey, formattedPromotion);
      return res.status(200).json(formattedPromotion);
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

  public async getStatus(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'promotions_read');
      const cache = await this.getCache('promotions-status');
      if (cache) return res.status(200).json(cache);
      const status = PromotionStatusTypes.labelsToKeyValue();
      await this.createCache('promotions-status', status);
      return res.status(200).json(status);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async getDiscountTypes(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'promotions_read');
      const cache = await this.getCache('promotions-discount-type');
      if (cache) return res.status(200).json(cache);
      const discountType = DiscountTypes.labelsToKeyValue();
      await this.createCache('promotions-discount-type', discountType);
      return res.status(200).json(discountType);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  private formatPromotion(promotion: Promotion) {
    const { products, category, ...rest } = promotion;
    const {
      initial_date,
      final_date,
      status,
      discount_amount,
      discount_type,
      ...restPromotion
    } = rest;

    return {
      ...restPromotion,
      initial_date: formatLocaleDateString(initial_date),
      final_date: formatLocaleDateString(final_date),
      status: PromotionStatusTypes.getLabel(status),
      discount_amount,
      discount_type,
      formatted_discount: formatDiscount(discount_amount, discount_type),
      category: {
        ...category,
      },
      products: {
        ...products,
      },
    };
  }
}
