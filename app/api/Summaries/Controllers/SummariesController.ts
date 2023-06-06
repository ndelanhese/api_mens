import BaseController from '@base-controller/BaseController';
import HttpError from '@exceptions/HttpError';
import { Request, Response } from 'express';

import PaymentMethodsModel from '../Models/PaymentsMethods';
import ProductsModel from '../Models/ProductsModel';

import {
  IMethodSummary,
  IPaymentMethodsResponse,
  IProductSummary,
  IProductsResponse,
} from './SummariesController.types';

export default class SummariesController extends BaseController {
  public async getTopProducts(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const cacheKey = `summaries-${JSON.stringify(req.query)}`;
      // await this.verifyPermission(req, 'summaries_read');
      const cache = await this.getCache(cacheKey);
      if (cache) {
        return res.status(200).json(cache);
      }
      const summariesModel = new ProductsModel();
      //TODO -> Pegar datas
      const summaries = await summariesModel.getProducts();
      const calculatedProductsSummary = this.returnInData(
        this.calculateProductSummary(summaries),
      );
      await this.createCache(cacheKey, calculatedProductsSummary);
      return res.status(200).json(calculatedProductsSummary);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async getTopMethodsOfPayments(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const cacheKey = `methods-of-payments-${JSON.stringify(req.query)}`;
      // await this.verifyPermission(req, 'methods_of_payments_read');
      const cache = await this.getCache(cacheKey);
      if (cache) {
        return res.status(200).json(cache);
      }
      const paymentMethodsModel = new PaymentMethodsModel();
      //TODO -> Pegar datas
      const summaries = await paymentMethodsModel.getPaymentMethods();
      const calculatedPaymentMethodsSummary = this.returnInData(
        this.calculatePaymentMethodsSummary(summaries),
      );
      await this.createCache(cacheKey, calculatedPaymentMethodsSummary);
      return res.status(200).json(calculatedPaymentMethodsSummary);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  private calculateProductSummary(salesProducts: IProductsResponse[]) {
    const productsSummary: Record<number, IProductSummary> =
      salesProducts.reduce((summary, saleProduct) => {
        const { product } = saleProduct;
        const { id } = product;

        if (summary[id]) {
          summary[id].quantity += saleProduct.quantity;
        } else {
          summary[id] = {
            id,
            name: product.name,
            description: product.description,
            quantity: saleProduct.quantity,
          };
        }
        return summary;
      }, {} as Record<number, IProductSummary>);
    return Object.values(productsSummary);
  }

  private calculatePaymentMethodsSummary(
    paymentMethods: IPaymentMethodsResponse[],
  ) {
    const paymentMethodsSummary: Record<number, IMethodSummary> =
      paymentMethods.reduce((summary, paymentMethod) => {
        const { method } = paymentMethod;
        const { id } = method;

        if (summary[id]) {
          summary[id].quantity += 1;
        } else {
          summary[id] = {
            id,
            name: method.name,
            quantity: 1,
          };
        }
        return summary;
      }, {} as Record<number, IMethodSummary>);
    return Object.values(paymentMethodsSummary);
  }
}
