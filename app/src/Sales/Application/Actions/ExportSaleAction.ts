import getDate from '@app/src/Shared/Infrastructure/Utils/Date';

import Customer from '../../Domain/Entities/Customer';
import Employee from '../../Domain/Entities/Employee';
import Payment from '../../Domain/Entities/Payment';
import Product from '../../Domain/Entities/Product';
import Sale from '../../Domain/Entities/Sale';
import User from '../../Domain/Entities/User';
import CustomersModel from '../../Infrastructure/Models/CustomersModel';
import UserModel from '../../Infrastructure/Models/UsersModel';
import SalesRepository from '../../Infrastructure/Repositories/SalesRepository';
import { ISaleExportResponse } from '../../Infrastructure/Repositories/SalesRepository.types';
import SheetService from '../../Infrastructure/Services/SheetService';
import ExportSalesInputData from '../Dtos/ExportSaleInputData';

export default class ExportSaleAction {
  async execute(input: ExportSalesInputData) {
    const initial_date = !input.initial_date
      ? undefined
      : getDate(input.initial_date);
    const final_date = !input.final_date
      ? undefined
      : getDate(input.final_date);
    const status = this.parseToStringArray(input.status);
    const customers_id = this.parseToNumberArray(input.customers_id);
    const users_id = this.parseToNumberArray(input.users_id);
    const saleRepository = new SalesRepository();
    const sales = await saleRepository.export({
      initial_date,
      final_date,
      status,
      customers_id,
      users_id,
    });
    const salesMapped = await this.prepareDataResponse(sales);
    return this.convertXlsx(salesMapped);
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

  private convertXlsx(sale: Sale[]) {
    const sheetService = new SheetService();
    return sheetService.dataToSheet(sale);
  }

  private prepareDataResponse(sales: ISaleExportResponse[]) {
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
        new Payment(
          paymentMethod.method.id,
          paymentMethod.installment,
          paymentMethod.method.name,
        ),
    );
  }

  private prepareProducts(input: ISaleExportResponse) {
    const products = input.sales_products;
    if (!products) {
      return undefined;
    }
    return products.map(productSale => {
      const { product } = productSale;
      return new Product(
        product.id,
        productSale.quantity,
        productSale.final_value,
        productSale.discount_amount,
        productSale.discount_type,
        product.part_number,
        product.name,
      );
    });
  }
}
