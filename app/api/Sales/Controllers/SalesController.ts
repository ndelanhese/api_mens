import { ProductStatusTypes } from '@app/src/Products/Domain/Enums/ProductStatusTypes';
import CreateSaleAction from '@app/src/Sales/Application/Actions/CreateSaleAction';
import ExportSaleAction from '@app/src/Sales/Application/Actions/ExportSaleAction';
import UpdateSaleAction from '@app/src/Sales/Application/Actions/UpdateSaleAction';
import UpdateSaleStatusAction from '@app/src/Sales/Application/Actions/UpdateSaleStatusAction';
import ExportSalesInputData from '@app/src/Sales/Application/Dtos/ExportSaleInputData';
import { DiscountTypes } from '@app/src/Sales/Domain/Enums/DiscountTypes';
import { SaleStatusTypes } from '@app/src/Sales/Domain/Enums/SaleStatusTypes';
import { formatCpf } from '@app/src/Shared/Infrastructure/Utils/CpfCnpjFormatter';
import {
  formatLocaleDateString,
  getDateString,
} from '@app/src/Shared/Infrastructure/Utils/Date';
import {
  formatPhoneNumber,
  formatRG,
} from '@app/src/Shared/Infrastructure/Utils/Formatter';
import { formatDiscount } from '@app/src/Shared/Infrastructure/Utils/helpers/discountFormatter';
import { formatMoneyByCurrencySymbol } from '@app/src/Shared/Infrastructure/Utils/helpers/money';
import BaseController from '@base-controller/BaseController';
import HttpError from '@exceptions/HttpError';
import { Request, Response } from 'express';

import CreateSaleFactory from '../Factories/CreateSaleFactory';
import ExportSaleFactory from '../Factories/ExportSaleFactory';
import ListSaleFactory from '../Factories/ListSaleFactory';
import UpdateSaleFactory from '../Factories/UpdateSaleFactory';
import UpdateSaleStatusFactory from '../Factories/UpdateSaleStatusFactory';
import SalesModel from '../Models/SalesModel';

import { Sale } from './SalesController.types';

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
      // const { page, perPage } = PaginationFactory.fromRequest(req);
      const inputData = ListSaleFactory.fromRequest(req);
      const salesModel = new SalesModel();
      const sales = await salesModel.getSales(inputData);
      const preparedSales = sales.map(sale => this.prepareSale(sale));
      const salesPaginated = this.returnInData(preparedSales);
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
      const preparedSale = this.prepareSale(sale);
      await this.createCache(cacheKey, preparedSale);
      return res.status(200).json(preparedSale);
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

  public async getStatus(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'sales_read');
      const cache = await this.getCache('sales-status');
      if (cache) return res.status(200).json(cache);
      const status = SaleStatusTypes.labelsToKeyValue();
      await this.createCache('sales-status', status);
      return res.status(200).json(status);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async getDiscountTypes(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'sales_read');
      const cache = await this.getCache('sales-discount-type');
      if (cache) return res.status(200).json(cache);
      const discountType = DiscountTypes.labelsToKeyValue();
      await this.createCache('sales-discount-type', discountType);
      return res.status(200).json(discountType);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async getMethodsOfPayments(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const cacheKey = 'sales-methods-of-payments';

      await this.verifyPermission(req, 'sales_read');
      const cache = await this.getCache(cacheKey);
      if (cache) return res.status(200).json(cache);
      const methodsOfPaymentsModel = new SalesModel();
      const methods = await methodsOfPaymentsModel.getMethodsOfPayment();
      await this.createCache(cacheKey, methods);
      return res.status(200).json(methods);
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

  private prepareSale(sale: Sale) {
    const {
      date,
      discount_amount,
      discount_type,
      final_value,
      status,
      customer,
      employee,
      id,
      methods_of_payments,
      observation,
      products,
      total_value,
      createdAt,
    } = sale;

    const {
      birth_date: customerBirthDate,
      cpf: customerCpf,
      phone: customerPhone,
      rg: customerRg,
      ...restCustomer
    } = customer;

    const preparedCustomer = {
      ...restCustomer,
      birth_date: formatLocaleDateString(customerBirthDate),
      cpf: formatCpf(customerCpf),
      rg: formatRG(customerRg),
      phone: formatPhoneNumber(customerPhone),
    };

    const { cpf: cpfEmployee, ...restEmployee } = employee;

    const preparedEmployee = {
      ...restEmployee,
      cpf: formatCpf(cpfEmployee),
    };

    const preparedProducts = products.map(product => {
      const { status, purchase_price, price, ...restProduct } = product;
      return {
        ...restProduct,
        status: ProductStatusTypes.getLabel(status),
        purchase_price,
        purchase_price_formatted: formatMoneyByCurrencySymbol(purchase_price),
        price,
        price_formatted: formatMoneyByCurrencySymbol(price),
      };
    });

    return {
      id,
      date: formatLocaleDateString(date),
      discount_amount,
      discount_type,
      formatted_discount: formatDiscount(discount_amount, discount_type),
      final_value,
      formatted_final_value: formatMoneyByCurrencySymbol(final_value),
      status: SaleStatusTypes.getLabel(status),
      customer: preparedCustomer,
      employee: preparedEmployee,
      methods_of_payments,
      observation,
      products: preparedProducts,
      total_value,
      createdAt,
    };
  }
}
