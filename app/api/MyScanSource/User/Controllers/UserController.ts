import { Response, Request } from 'express';
import HttpError from '@exceptions/NotAuthorizedHttpError';
import BaseController from '@my-scan-source/Shared/Controllers/BaseController';

export default class UserController extends BaseController {
  public async getUserByToken(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        throw new HttpError('Não autorizado');
      }
      return res.status(200).json(this.getUser(authorization));
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }
}
