import getDate from '@app/src/Shared/Infrastructure/Utils/Date';

import Customer from '../../Domain/Entities/Customer';
import Employee from '../../Domain/Entities/Employee';
import Order from '../../Domain/Entities/Order';
import Product from '../../Domain/Entities/Product';
import User from '../../Domain/Entities/User';
import CustomersModel from '../../Infrastructure/Models/CustomersModel';
import UserModel from '../../Infrastructure/Models/UsersModel';
import OrdersRepository from '../../Infrastructure/Repositories/OrdersRepository';
import { IOrderExportResponse } from '../../Infrastructure/Repositories/OrdersRepository.types';
import SheetService from '../../Infrastructure/Services/SheetService';
import ExportOrdersInputData from '../Dtos/ExportOrdersInputData';

export default class ExportOrdersAction {
  async execute(input: ExportOrdersInputData) {
    const initial_date = !input.initial_date
      ? undefined
      : getDate(input.initial_date);
    const final_date = !input.final_date
      ? undefined
      : getDate(input.final_date);
    const status = this.parseToStringArray(input.status);
    const customers_id = this.parseToNumberArray(input.customers_id);
    const users_id = this.parseToNumberArray(input.users_id);
    const orderRepository = new OrdersRepository();
    const orders = await orderRepository.export({
      initial_date,
      final_date,
      status,
      customers_id,
      users_id,
    });
    const ordersMapped = await this.prepareDataResponse(orders);
    return this.convertXlsx(ordersMapped);
  }

  private parseToStringArray(value: string | undefined) {
    if (value !== 'undefined' && value) {
      if (value.includes(',')) {
        return value.split(',');
      }
      return [value];
    }
    return [];
  }

  private parseToNumberArray(value: string | undefined) {
    if (value !== 'undefined' && value) {
      if (value.includes(',')) {
        return value.split(',').map(v => parseInt(v));
      }
      return [parseInt(value)];
    }
    return [];
  }

  private convertXlsx(order: Order[]) {
    const sheetService = new SheetService();
    return sheetService.dataToSheet(order);
  }

  private prepareDataResponse(orders: IOrderExportResponse[]) {
    const ordersMapped = Promise.all(
      orders.map(async order => {
        const customer = await this.getCustomer(order.customer_id);
        const user = await this.getUser(order.user_id);
        const products = this.prepareProducts(order);
        return new Order(
          order.date,
          customer,
          user,
          products,
          order.observation,
          order.description,
          order.status,
          order.id,
        );
      }),
    );
    return ordersMapped;
  }

  private async getCustomer(id: number) {
    const customerModel = new CustomersModel();
    const customer = await customerModel.getCustomer(id);
    return new Customer(
      customer.name,
      customer.cpf,
      customer.birth_date,
      customer.phone,
      customer.status,
      customer.rg,
      customer.id,
    );
  }
  private async getUser(id: number) {
    const userModel = new UserModel();
    const user = await userModel.getUser(id);
    const employee = new Employee(
      user.employee.name,
      user.employee.cpf,
      user.employee.id,
    );
    return new User(user.user, user.email, employee, user.id);
  }

  private prepareProducts(input: IOrderExportResponse) {
    const products = input.orders_products;
    if (!products) {
      return undefined;
    }
    return products.map(productOrder => {
      const { product } = productOrder;
      return new Product(
        product.id,
        productOrder.quantity,
        product.part_number,
        product.name,
      );
    });
  }
}
