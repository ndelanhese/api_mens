import BaseController from '@base-controller/BaseController';
import HttpError from '@exceptions/HttpError';
import { Response, Request } from 'express';

export default class ProfileController extends BaseController {
  public async getProfile(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      return res.status(200).json(this.getUser(req.headers.authorization));
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }
}
