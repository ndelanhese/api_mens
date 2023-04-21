import { States } from '@app/src/Extras/Domain/Enums/States';
import BaseController from '@base-controller/BaseController';
import HttpError from '@exceptions/HttpError';
import { Request, Response } from 'express';

export default class StatesController extends BaseController {
  public async getStates(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const cache = await this.getCache('states');
      if (cache) {
        return res.status(200).json(cache);
      }
      const states = States.labelsToKeyValue();
      await this.createCache('states', states);
      return res.status(200).json(states);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }
}
