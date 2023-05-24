import Customer from '../../Domain/Entities/Customer';
import Employee from '../../Domain/Entities/Employee';
import Payment from '../../Domain/Entities/Payment';
import Product from '../../Domain/Entities/Product';
import Sale from '../../Domain/Entities/Sale';
import User from '../../Domain/Entities/User';
import { StatusTypesOptions } from '../../Domain/Enums/StatusTypes.types';
import CustomersModel from '../Models/CustomersModel';
import SalesModel from '../Models/SalesModel';
import UserModel from '../Models/UsersModel';

import { ISaleExportResponse, ISaleFilter } from './SalesRepository.types';

export default class SalesRepository {
  private salesModel: SalesModel;

  constructor() {
    this.salesModel = new SalesModel();
  }

  async save(sale: Sale): Promise<Sale> {
    if (sale.getId()) {
      return this.update(sale);
    }
    return this.create(sale);
  }

  async create(sale: Sale): Promise<Sale> {
    const { id } = await this.salesModel.createSale(sale);
    return sale.setId(id);
  }

  async update(sale: Sale): Promise<Sale> {
    await this.salesModel.updateSale(sale);
    return sale;
  }

  async updateStatus(
    id: number,
    status: StatusTypesOptions,
    observation: string,
  ) {
    await this.salesModel.updateSaleStatus(id, status, observation);
  }

  async export(input: ISaleFilter) {
    //TODO -> adiciona produtos, métodos de pagamento e etc
    const sales = await this.salesModel.exportSales(input);
    const salesMapped = Promise.all(
      sales.map(async sale => {
        const customer = await this.getCustomer(sale.customer_id);
        const user = await this.getUser(sale.user_id);
        const paymentMethods = this.preparePaymentMethods(sale);
        const products = this.prepareProducts(sale);
        return new Sale(
          sale.date,
          sale.total_value,
          sale.final_value,
          customer,
          user,
          paymentMethods,
          products,
          sale.observation,
          sale.discount_amount,
          sale.discount_type,
          sale.status,
          sale.id,
        );
      }),
    );
    return salesMapped;
  }

  async getSale(id: number) {
    return await this.salesModel.getSale(id);
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

  private preparePaymentMethods(input: ISaleExportResponse) {
    const paymentMethods = input.methods_of_payments;
    if (!paymentMethods) {
      return undefined;
    }
    return paymentMethods.map(
      paymentMethod =>
        new Payment(paymentMethod.method.id, paymentMethod.installment),
    );
  }

  private prepareProducts(input: ISaleExportResponse) {
    const products = input.sales_products;
    if (!products) {
      return undefined;
    }
    return products.map(
      product =>
        new Product(
          product.id,
          product.quantity,
          product.final_value,
          product.discount_amount,
          product.discount_type,
        ),
    );
  }
}
