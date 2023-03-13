import HttpError from '@exceptions/HttpError';
import BaseController from '@my-scan-source-base-controller/BaseController';
import { Request, Response } from 'express';
import CreateEstimateFactory from '../Factories/CreateEstimateFactory';
import CreateEstimateAction from '@app/src/Estimates/Application/Actions/CreateEstimateAction';

export default class EstimatesController extends BaseController {
  public async createEstimate(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const estimateInputData = CreateEstimateFactory.fromRequest(req);
      const estimateAction = new CreateEstimateAction();
      const estimateId = (
        await estimateAction.execute(estimateInputData)
      ).getId();
      await this.deleteCache('estimates-admin');
      return res.status(200).json(estimateId);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }
}
