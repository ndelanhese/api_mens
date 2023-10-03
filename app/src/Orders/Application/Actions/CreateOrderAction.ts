import getDate from '@app/src/Shared/Infrastructure/Utils/Date';
import { capitalizeWords } from '@app/src/Shared/Infrastructure/Utils/String';

import Customer from '../../Domain/Entities/Customer';
import Employee from '../../Domain/Entities/Employee';
import Order from '../../Domain/Entities/Order';
import Product from '../../Domain/Entities/Product';
import User from '../../Domain/Entities/User';
import ListCustomersModel from '../../Infrastructure/Models/CustomersModel';
import UserModel from '../../Infrastructure/Models/UsersModel';
import OrdersRepository from '../../Infrastructure/Repositories/OrdersRepository';
import CreateOrderInputData from '../Dtos/CreateOrderInputData';

export default class CreateOrderAction {
  async execute(input: CreateOrderInputData) {
    const ordersRepository = new OrdersRepository();
    const customer = await this.getCustomer(input.customer_id);
    const user = await this.getUser(input.user_id);
    const products = input?.order_products?.map(
      product => new Product(product.id, product.quantity),
    );
    const order = new Order(
      getDate(input.date),
      customer,
      user,
      products,
      input.observation,
      input.description,
      input.status,
    );
    return await ordersRepository.save(order);
  }

  private async getCustomer(customer_id: number) {
    const customerModel = new ListCustomersModel();
    const customer = await customerModel.getCustomer(customer_id);
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

  private async getUser(user_id: number) {
    const userModel = new UserModel();
    const user = await userModel.getUser(user_id);
    const { employee: employeeData } = user;
    const employee = new Employee(
      capitalizeWords(employeeData.name),
      employeeData.cpf,
      employeeData.id,
    );
    return new User(user.user, user.email, employee);
  }
}
