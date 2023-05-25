import getDate from '@app/src/Shared/Domain/Utils/Date';

import Customer from '../../Domain/Entities/Customer';
import Employee from '../../Domain/Entities/Employee';
import Payment from '../../Domain/Entities/Payment';
import Product from '../../Domain/Entities/Product';
import Sale from '../../Domain/Entities/Sale';
import User from '../../Domain/Entities/User';
import ListCustomersModel from '../../Infrastructure/Models/CustomersModel';
import UserModel from '../../Infrastructure/Models/UsersModel';
import SalesRepository from '../../Infrastructure/Repositories/SalesRepository';
import CreateSaleInputData from '../Dtos/CreateSaleInputData';

export default class CreateSaleAction {
  async execute(input: CreateSaleInputData) {
    const salesRepository = new SalesRepository();
    const customer = await this.getCustomer(input.customer_id);
    const user = await this.getUser(input.user_id);
    const paymentMethods = input.sale_payment_methods.map(
      paymentMethod =>
        new Payment(paymentMethod.type, paymentMethod.installment),
    );
    const products = input.sale_products.map(
      product =>
        new Product(
          product.id,
          product.quantity,
          product.final_value,
          product.discount_amount,
          product.discount_type,
        ),
    );
    const sale = new Sale(
      getDate(input.date),
      input.total_value,
      input.final_value,
      customer,
      user,
      paymentMethods,
      products,
      input.observation,
      input.discount_amount,
      input.discount_type,
      input.status,
    );
    return await salesRepository.save(sale);
  }

  private async getCustomer(customer_id: number) {
    const customerModel = new ListCustomersModel();
    const customer = await customerModel.getCustomer(customer_id);
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

  private async getUser(user_id: number) {
    const userModel = new UserModel();
    const user = await userModel.getUser(user_id);
    const { employee: employeeData } = user;
    const employee = new Employee(
      employeeData.name,
      employeeData.cpf,
      employeeData.id,
    );
    return new User(user.user, user.email, employee);
  }
}
