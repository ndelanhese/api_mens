import { Request, Response } from 'express';
import HttpError from '@exceptions/HttpError';
import EstimatesModel from '../Models/EstimatesModel';
import BaseController from '@admin-base-controller/BaseController';

export default class EstimatesController extends BaseController {
  private estimatesModel: EstimatesModel;

  constructor() {
    super();
    this.estimatesModel = new EstimatesModel();
  }

  public async getEstimates(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const cache = await this.getCache(`estimates-admin`);
      if (cache) return res.status(200).json(cache);
      const estimate = await this.estimatesModel.findEstimates();
      if (estimate.length === 0) return res.status(200).json([]);
      await this.createCache(`estimates-admin`, { data: estimate });
      return res.status(200).json({ data: estimate });
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async getEstimate(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const { id } = req.params;
      const cache = await this.getCache(`estimates-admin-${id}`);
      if (cache) return res.status(200).json(cache);
      const estimate = await this.estimatesModel.findEstimateById(Number(id));
      if (!estimate) return res.status(200).json([]);
      await this.createCache(`estimates-admin-${id}`, {
        data: estimate,
      });
      return res.status(200).json({ data: estimate });
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }
}
