import { DiscountTypes } from '@app/src/Shared/Domain/Enums/DiscountTypes';
import BaseController from '@base-controller/BaseController';
import HttpError from '@exceptions/HttpError';
import { Request, Response } from 'express';

export default class DiscountTypesController extends BaseController {
  public async getDiscountTypes(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const cache = await this.getCache('discountTypes');
      if (cache) {
        return res.status(200).json(cache);
      }
      const discountTypes = DiscountTypes.labelsToKeyValue();
      const data = this.returnInData(discountTypes);
      await this.createCache('discountTypes', data);
      return res.status(200).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }
}
