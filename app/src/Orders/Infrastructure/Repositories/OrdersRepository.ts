import { StatusTypesOptions } from '@app/src/Shared/Domain/Enums/StatusTypes.types';

import Order from '../../Domain/Entities/Order';
import OrdersModel from '../Models/OrdersModel';

import { IOrderFilter } from './SalesRepository.types';

export default class OrdersRepository {
  private ordersModel: OrdersModel;

  constructor() {
    this.ordersModel = new OrdersModel();
  }

  async save(sale: Order): Promise<Order> {
    if (sale.getId()) {
      return this.update(sale);
    }
    return this.create(sale);
  }

  async create(sale: Order): Promise<Order> {
    const { id } = await this.ordersModel.createOrder(sale);
    return sale.setId(id);
  }

  async update(sale: Order): Promise<Order> {
    await this.ordersModel.updateOrder(sale);
    return sale;
  }

  async updateStatus(
    id: number,
    status: StatusTypesOptions,
    observation: string,
  ) {
    await this.ordersModel.updateOrderStatus(id, status, observation);
  }

  async export(input: IOrderFilter) {
    return await this.ordersModel.exportOrders(input);
  }

  async getOrder(id: number) {
    return await this.ordersModel.getOrder(id);
  }
}
