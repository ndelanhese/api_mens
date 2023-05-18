import PaginationFactory from '@app/api/Shared/Factories/PaginationFactory';
import CreateSaleAction from '@app/src/Sales/Application/Actions/CreateSaleAction';
import { getDateString, getTime } from '@app/src/Shared/Domain/Utils/Date';
import BaseController from '@base-controller/BaseController';
import HttpError from '@exceptions/HttpError';
import { Request, Response } from 'express';

import CreateSaleFactory from '../Factories/CreateSaleFactory';
import SalesModel from '../Models/SalesModel';

export default class SalesController extends BaseController {
  public async getSales(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const cacheKey = `sales-${JSON.stringify(req.query)}`;
      await this.verifyPermission(req, 'sales_read');
      const cache = await this.getCache(cacheKey);
      if (cache) {
        return res.status(200).json(cache);
      }
      const { page, perPage } = PaginationFactory.fromRequest(req);
      const salesModel = new SalesModel();
      const sales = await salesModel.getSales();
      const salesPaginated = this.dataPagination(page, perPage, sales);
      await this.createCache(cacheKey, salesPaginated);
      return res.status(200).json(salesPaginated);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async getSale(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const id = Number(req.params.id);
      const cacheKey = `sales-${id}`;
      await this.verifyPermission(req, 'sales_read');
      const cache = await this.getCache(cacheKey);
      if (cache) {
        return res.status(200).json(cache);
      }
      const salesModel = new SalesModel();
      const sale = await salesModel.getSale(id);
      await this.createCache(cacheKey, sale);
      return res.status(200).json(sale);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async createSale(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'sales_create');
      const saleInputData = CreateSaleFactory.fromRequest(req);
      const saleAction = new CreateSaleAction();
      const saleId = (await saleAction.execute(saleInputData)).getId();
      await this.deleteCache('sales');
      return res.status(204).json(saleId);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async deleteSale(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'sales_delete');
      await this.deleteCache('sales');
      return res.status(204).send();
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async updateSale(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'sales_update');
      await this.deleteCache('sales');
      return res.status(204).send();
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async updateSaleStatus(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'sales_update');
      await this.deleteCache('sales');
      return res.status(204).send();
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async exportSales(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'sales_export');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="Tabela-de-produtos-${getDateString()}-${getTime()}.xlsx"`,
      );
      res.setHeader('Content-Type', 'application/vnd.ms-excel');
      return res.end('sales');
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }
}
