import BaseController from '@base-controller/BaseController';
import HttpError from '@exceptions/HttpError';
import { Request, Response } from 'express';

import CustomersModel from '../Models/CustomersModel';

export default class UsersController extends BaseController {
  private customersModel: CustomersModel;

  constructor() {
    super();
    this.customersModel = new CustomersModel();
  }

  public async getCustomers(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      // await this.verifyPermission(req, 'customers_read');
      // const cache = await this.getCache('customers');
      // if (cache) return res.status(200).json(cache);
      const customers = await this.customersModel.getCustomers();
      await this.createCache('customers', customers);
      return res.status(200).json(customers);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }
}
