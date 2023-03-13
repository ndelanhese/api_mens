import BaseController from '@admin-base-controller/BaseController';
import { Request, Response } from 'express';
import HttpError from '@exceptions/HttpError';

export default class CurrenciesController extends BaseController {
  public async getCurrencies(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const cache = await this.getCache('currencies-admin');
      if (cache) {
        return res.status(200).json(cache);
      }
      const currenciesList = ['R$', '$', '€', '£'];
      const currenciesName = ['Real', 'Dólar', 'Euro', 'Libra'];
      const currenciesCode = ['BRL', 'USD', 'EUR', 'GBP'];

      const currencies = {
        data: currenciesList.map((item, index) => ({
          currency: item,
          name: currenciesName[index],
          code: currenciesCode[index],
        })),
      };
      await this.createCache('currencies-admin', currencies);
      return res.status(200).json(currencies);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }
}
