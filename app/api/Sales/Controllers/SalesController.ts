import PaginationFactory from '@app/api/Shared/Factories/PaginationFactory';
import CreateSaleAction from '@app/src/Sales/Application/Actions/CreateSaleAction';
import ExportSaleAction from '@app/src/Sales/Application/Actions/ExportSaleAction';
import UpdateSaleAction from '@app/src/Sales/Application/Actions/UpdateSaleAction';
import UpdateSaleStatusAction from '@app/src/Sales/Application/Actions/UpdateSaleStatusAction';
import ExportSalesInputData from '@app/src/Sales/Application/Dtos/ExportSaleInputData';
import { getDateString } from '@app/src/Shared/Infrastructure/Utils/Date';
import BaseController from '@base-controller/BaseController';
import HttpError from '@exceptions/HttpError';
import { Request, Response } from 'express';

import CreateSaleFactory from '../Factories/CreateSaleFactory';
import ExportSaleFactory from '../Factories/ExportSaleFactory';
import ListSaleFactory from '../Factories/ListSaleFactory';
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
      const inputData = ListSaleFactory.fromRequest(req);
      const salesModel = new SalesModel();
      const sales = await salesModel.getSales(inputData);
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
      return res.status(201).json(saleId);
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
      await this.verifyPermission(req, 'sales_export');
      const saleAction = new ExportSaleAction();
      const saleInputData = ExportSaleFactory.fromRequest(req);
      const sales = await saleAction.execute(saleInputData);
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="Tabela-de-vendas-${this.prepareFileName(
          saleInputData,
        )}.xlsx"`,
      );
      res.setHeader('Content-Type', 'application/vnd.ms-excel');
      return res.end(sales);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  private prepareFileName(input: ExportSalesInputData) {
    const name = [''];
    if (input.initial_date) {
      if (input.initial_date && input.final_date) {
        const initialDate = new Date(input.initial_date);
        name.push(`de-${getDateString(initialDate)}`);
      }
      if (input.initial_date && !input.final_date) {
        const initialDate = new Date(input.initial_date);
        name.push(`a-partir-de-${getDateString(initialDate)}`);
      }
    }
    if (input.final_date) {
      const finalDate = new Date(input.final_date);
      name.push(`ate-${getDateString(finalDate)}`);
    }
    if (input.status) {
      name.push(`status-${input.status}`);
    }
    if (input.customers_id) {
      name.push(`clientes-${input.customers_id}`);
    }
    if (input.users_id) {
      name.push(`usuarios-${input.users_id}`);
    }
    if (name.length === 1) {
      return '';
    }
    return name.join('-');
  }
}
