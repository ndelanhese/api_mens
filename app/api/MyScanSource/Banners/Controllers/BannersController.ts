import BaseController from '@my-scan-source-base-controller/BaseController';
import { Request, Response } from 'express';
import HttpError from '@exceptions/HttpError';
import BannersModels from '../Models/BannersModel';

export default class BannersController extends BaseController {
  private bannersModel: BannersModels;

  constructor() {
    super();
    this.bannersModel = new BannersModels();
  }

  public async getBanners(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const { area } = req.query;
      const cache = await this.getCache(`my-scan-source-banners-${area}`);
      if (cache) res.status(200).json(cache);
      const banners = await this.bannersModel.getBanners(
        area ? String(area) : 'slide-products',
      );
      await this.createCache(`my-scan-source-banners-${area}`, banners);
      return res.status(200).json(banners);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }
}
