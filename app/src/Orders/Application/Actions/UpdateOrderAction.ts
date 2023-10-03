import { capitalizeWords } from '@app/src/Shared/Infrastructure/Utils/String';

import Customer from '../../Domain/Entities/Customer';
import Employee from '../../Domain/Entities/Employee';
import Order from '../../Domain/Entities/Order';
import Product from '../../Domain/Entities/Product';
import User from '../../Domain/Entities/User';
import CustomersModel from '../../Infrastructure/Models/CustomersModel';
import UserModel from '../../Infrastructure/Models/UsersModel';
import OrdersRepository from '../../Infrastructure/Repositories/OrdersRepository';
import UpdateOrderInputData from '../Dtos/UpdateOrderInputData';

export default class UpdateOrderAction {
  async execute(input: UpdateOrderInputData) {
    const currentOrder = await this.getCurrentOrder(input.id);
    const customerId = input.customer_id ?? currentOrder.customer_id;
    const userId = input.user_id ?? currentOrder.user_id;
    const customer = await this.getCustomer(customerId);
    const user = await this.getUser(userId);
    const products = this.prepareProducts(input);
    const order = new Order(
      currentOrder.date,
      customer,
      user,
      products,
      input.observation ?? currentOrder.observation,
      input.description ?? currentOrder.description,
      input.status ?? currentOrder.status,
      currentOrder.id,
    );
    const orderRepository = new OrdersRepository();
    await orderRepository.save(order);
  }

  private async getCurrentOrder(id: number) {
    const ordersRepository = new OrdersRepository();
    return await ordersRepository.getOrder(id);
  }
  private async getCustomer(id: number) {
    const customerModel = new CustomersModel();
    const customer = await customerModel.getCustomer(id);
    return new Customer(
      capitalizeWords(customer.name),
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
      capitalizeWords(user.employee.name),
      user.employee.cpf,
      user.employee.id,
    );
    return new User(user.user, user.email, employee, user.id);
  }

  private prepareProducts(input: UpdateOrderInputData) {
    if (!input.order_products) {
      return undefined;
    }
    return input.order_products.map(
      product => new Product(product.id, product.quantity),
    );
  }
}
