import PaginationFactory from '@app/api/Shared/Factories/PaginationFactory';
import CreateSaleAction from '@app/src/Sales/Application/Actions/CreateSaleAction';
import ExportSaleAction from '@app/src/Sales/Application/Actions/ExportSaleAction';
import UpdateSaleAction from '@app/src/Sales/Application/Actions/UpdateSaleAction';
import UpdateSaleStatusAction from '@app/src/Sales/Application/Actions/UpdateSaleStatusAction';
import { getDateString, getTime } from '@app/src/Shared/Domain/Utils/Date';
import BaseController from '@base-controller/BaseController';
import HttpError from '@exceptions/HttpError';
import { Request, Response } from 'express';

import CreateSaleFactory from '../Factories/CreateSaleFactory';
import UpdateSaleFactory from '../Factories/UpdateSaleFactory';
import UpdateSaleStatusFactory from '../Factories/UpdateSaleStatusFactory';
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
      return res.status(200).json(saleId);
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
      const saleInputData = UpdateSaleFactory.fromRequest(req);
      const saleAction = new UpdateSaleAction();
      await saleAction.execute(saleInputData);
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
      const saleInputData = UpdateSaleStatusFactory.fromRequest(req);
      const saleAction = new UpdateSaleStatusAction();
      await saleAction.execute(saleInputData);
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
      //TODO -> pegar filtros da request (categoria, marca, produto, método de pagamento, cliente, funcionário, data, status e etc)
      await this.verifyPermission(req, 'sales_export');
      const saleAction = new ExportSaleAction();
      const sales = await saleAction.execute();
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="Tabela-de-vendas-${getDateString()}-${getTime()}.xlsx"`,
      );
      res.setHeader('Content-Type', 'application/vnd.ms-excel');
      return res.end(sales);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }
}
