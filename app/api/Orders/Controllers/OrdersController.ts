import PaginationFactory from '@app/api/Shared/Factories/PaginationFactory';
import CreateOrderAction from '@app/src/Orders/Application/Actions/CreateOrderAction';
import ExportOrderAction from '@app/src/Orders/Application/Actions/ExportOrderAction';
import UpdateOrderAction from '@app/src/Orders/Application/Actions/UpdateOrderAction';
import UpdateOrderStatusAction from '@app/src/Orders/Application/Actions/UpdateOrderStatusAction';
import ExportOrdersInputData from '@app/src/Orders/Application/Dtos/ExportOrdersInputData';
import { OrderStatusTypes } from '@app/src/Orders/Domain/Enums/OrderStatusTypes';
import { ProductStatusTypes } from '@app/src/Products/Domain/Enums/ProductStatusTypes';
import { formatCpf } from '@app/src/Shared/Infrastructure/Utils/CpfCnpjFormatter';
import {
  formatLocaleDateString,
  getDateString,
} from '@app/src/Shared/Infrastructure/Utils/Date';
import {
  formatRG,
  formatPhoneNumber,
  formatPisPasep,
} from '@app/src/Shared/Infrastructure/Utils/Formatter';
import { formatMoneyByCurrencySymbol } from '@app/src/Shared/Infrastructure/Utils/helpers/money';
import BaseController from '@base-controller/BaseController';
import HttpError from '@exceptions/HttpError';
import { Request, Response } from 'express';

import CreateOrderFactory from '../Factories/CreateOrderFactory';
import ExportOrderFactory from '../Factories/ExportOrderFactory';
import ListOrderFactory from '../Factories/ListOrderFactory';
import UpdateOrderFactory from '../Factories/UpdateOrderFactory';
import UpdateOrderStatusFactory from '../Factories/UpdateOrderStatusFactory';
import OrdersModel from '../Models/OrdersModel';

import { Order } from './OrdersController.types';

export default class OrdersController extends BaseController {
  public async getOrders(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const cacheKey = `orders-${JSON.stringify(req.query)}`;
      await this.verifyPermission(req, 'orders_read');
      const cache = await this.getCache(cacheKey);
      if (cache) {
        return res.status(200).json(cache);
      }
      const { page, perPage } = PaginationFactory.fromRequest(req);
      const inputData = ListOrderFactory.fromRequest(req);
      const ordersModel = new OrdersModel();
      const orders = await ordersModel.getOrders(inputData);
      const preparedOrders = orders.map((order: Order) =>
        this.prepareOrder(order),
      );
      const ordersPaginated = this.dataPagination(
        page,
        perPage,
        preparedOrders,
      );
      await this.createCache(cacheKey, ordersPaginated);
      return res.status(200).json(ordersPaginated);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async getOrder(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const id = Number(req.params.id);
      const cacheKey = `orders-${id}`;
      await this.verifyPermission(req, 'orders_read');
      const cache = await this.getCache(cacheKey);
      if (cache) {
        return res.status(200).json(cache);
      }
      const ordersModel = new OrdersModel();
      const order = await ordersModel.getOrder(id);
      const preparedOrder = this.prepareOrder(order);
      await this.createCache(cacheKey, preparedOrder);
      return res.status(200).json(preparedOrder);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async createOrder(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'orders_create');
      const orderInputData = CreateOrderFactory.fromRequest(req);
      const orderAction = new CreateOrderAction();
      const orderId = (await orderAction.execute(orderInputData)).getId();
      await this.deleteCache('orders');
      return res.status(201).json(orderId);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async updateOrder(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'orders_update');
      await this.deleteCache('orders');
      const orderInputData = UpdateOrderFactory.fromRequest(req);
      const orderAction = new UpdateOrderAction();
      await orderAction.execute(orderInputData);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async updateOrderStatus(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'orders_update');
      await this.deleteCache('orders');
      const orderInputData = UpdateOrderStatusFactory.fromRequest(req);
      const orderAction = new UpdateOrderStatusAction();
      await orderAction.execute(orderInputData);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async exportOrders(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'orders_export');
      const orderAction = new ExportOrderAction();
      const orderInputData = ExportOrderFactory.fromRequest(req);
      const orders = await orderAction.execute(orderInputData);
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="Tabela-de-pedidos-${this.prepareFileName(
          orderInputData,
        )}.xlsx"`,
      );
      res.setHeader('Content-Type', 'application/vnd.ms-excel');
      return res.end(orders);
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
      await this.verifyPermission(req, 'orders_read');
      const cache = await this.getCache('orders-status');
      if (cache) return res.status(200).json(cache);
      const status = OrderStatusTypes.labelsToKeyValue();
      await this.createCache('orders-status', status);
      return res.status(200).json(status);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  private prepareFileName(input: ExportOrdersInputData) {
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

  private prepareOrder(order: Order) {
    const {
      id,
      date,
      observation,
      description,
      status,
      createdAt,
      customer,
      employee,
      orders_products,
    } = order;

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

    const {
      cpf: cpfEmployee,
      admission_date: employeeAdmissionDate,
      birth_date: employeeBirthDate,
      phone: employeePhone,
      pis_pasep: employeePisPasep,
      resignation_date: employeeResignationDate,
      rg: employeeRg,
      ...restEmployee
    } = employee;

    const preparedEmployee = {
      ...restEmployee,
      cpf: formatCpf(cpfEmployee),
      rg: formatRG(employeeRg),
      phone: formatPhoneNumber(employeePhone),
      birth_date: formatLocaleDateString(employeeBirthDate),
      admission_date: formatLocaleDateString(employeeAdmissionDate),
      resignation_date: formatLocaleDateString(employeeResignationDate),
      pis_pasep: formatPisPasep(employeePisPasep),
    };

    const preparedProducts = orders_products.map(orderProduct => {
      const {
        product: { status, purchase_price, price, ...restProduct },
        ...restOrderProduct
      } = orderProduct;

      return {
        ...restProduct,
        status: ProductStatusTypes.getLabel(status ?? ''),
        purchase_price,
        purchase_price_formatted: formatMoneyByCurrencySymbol(purchase_price),
        price,
        price_formatted: formatMoneyByCurrencySymbol(price),
        ...restOrderProduct,
      };
    });

    return {
      id,
      date: formatLocaleDateString(date),
      observation,
      description,
      status: OrderStatusTypes.getLabel(status ?? ''),
      createdAt,
      customer: preparedCustomer,
      employee: preparedEmployee,
      orders_products: preparedProducts,
    };
  }
}
