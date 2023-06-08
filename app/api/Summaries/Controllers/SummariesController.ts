import BaseController from '@base-controller/BaseController';
import HttpError from '@exceptions/HttpError';
import { Request, Response } from 'express';

import PaymentMethodsModel from '../Models/PaymentsMethods';
import ProductsBrandsModel from '../Models/ProductsBrandsModel';
import ProductsCategoriesModel from '../Models/ProductsCategoriesModel';
import ProductsModel from '../Models/ProductsModel';

import {
  IBrandSummary,
  ICategorySummary,
  IMethodSummary,
  IPaymentMethodsResponse,
  IProductSummary,
  IProductsBrandsResponse,
  IProductsCategoriesResponse,
  IProductsResponse,
} from './SummariesController.types';

export default class SummariesController extends BaseController {
  public async getTopProducts(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const cacheKey = `products-summaries-${JSON.stringify(req.query)}`;
      await this.verifyPermission(req, 'summaries_read');
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
      const cacheKey = `methods-of-payments-summaries-${JSON.stringify(
        req.query,
      )}`;
      await this.verifyPermission(req, 'summaries_read');
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

  public async getTopProductsCategories(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const cacheKey = `products-categories-summaries-${JSON.stringify(
        req.query,
      )}`;
      await this.verifyPermission(req, 'summaries_read');
      const cache = await this.getCache(cacheKey);
      if (cache) {
        return res.status(200).json(cache);
      }
      const summariesModel = new ProductsCategoriesModel();
      //TODO -> Pegar datas
      const summaries = await summariesModel.getProducts();
      const calculatedProductsCategoriesSummary = this.returnInData(
        this.calculateProductsCategoriesSummary(summaries),
      );
      await this.createCache(cacheKey, calculatedProductsCategoriesSummary);
      return res.status(200).json(calculatedProductsCategoriesSummary);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async getTopProductsBrands(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const cacheKey = `products-brands-summaries-${JSON.stringify(req.query)}`;
      await this.verifyPermission(req, 'summaries_read');
      const cache = await this.getCache(cacheKey);
      if (cache) {
        return res.status(200).json(cache);
      }
      const summariesModel = new ProductsBrandsModel();
      //TODO -> Pegar datas
      const summaries = await summariesModel.getProducts();
      const calculatedProductsBrandsSummary = this.returnInData(
        this.calculateProductsBrandsSummary(summaries),
      );
      await this.createCache(cacheKey, calculatedProductsBrandsSummary);
      return res.status(200).json(calculatedProductsBrandsSummary);
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

  private calculateProductsCategoriesSummary(
    productsCategories: IProductsCategoriesResponse[],
  ) {
    const productsCategoriesSummary: Record<number, ICategorySummary> =
      productsCategories.reduce((summary, productCategory) => {
        const { product } = productCategory;
        const { id, name } = product.category;

        if (summary[id]) {
          summary[id].quantity += 1;
        } else {
          summary[id] = {
            id,
            name: name,
            quantity: 1,
          };
        }
        return summary;
      }, {} as Record<number, ICategorySummary>);
    return Object.values(productsCategoriesSummary);
  }

  private calculateProductsBrandsSummary(
    productsBrands: IProductsBrandsResponse[],
  ) {
    const productsBrandsSummary: Record<number, IBrandSummary> =
      productsBrands.reduce((summary, productBrand) => {
        const { product } = productBrand;
        const { id, name } = product.brand;

        if (summary[id]) {
          summary[id].quantity += 1;
        } else {
          summary[id] = {
            id,
            name: name,
            quantity: 1,
          };
        }
        return summary;
      }, {} as Record<number, IBrandSummary>);
    return Object.values(productsBrandsSummary);
  }
}

//TODO -> Gerar pdf (exportar)
//TODO -> Gerar excel (exportar)
