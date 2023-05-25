import Customer from '../../Domain/Entities/Customer';
import Employee from '../../Domain/Entities/Employee';
import Payment from '../../Domain/Entities/Payment';
import Product from '../../Domain/Entities/Product';
import Sale from '../../Domain/Entities/Sale';
import User from '../../Domain/Entities/User';
import CustomersModel from '../../Infrastructure/Models/CustomersModel';
import UserModel from '../../Infrastructure/Models/UsersModel';
import SalesRepository from '../../Infrastructure/Repositories/SalesRepository';
import UpdateSaleInputData from '../Dtos/UpdateSaleInputData';

export default class UpdateSaleAction {
  async execute(input: UpdateSaleInputData) {
    const currentSale = await this.getCurrentSale(input.id);
    const customerId = input.customer_id ?? currentSale.customer_id;
    const userId = input.user_id ?? currentSale.user_id;
    const customer = await this.getCustomer(customerId);
    const user = await this.getUser(userId);
    const paymentMethods = this.preparePaymentMethods(input);
    const products = this.prepareProducts(input);
    const sale = new Sale(
      currentSale.date,
      input.total_value ?? currentSale.total_value,
      input.final_value ?? currentSale.final_value,
      customer,
      user,
      paymentMethods,
      products,
      input.observation ?? currentSale.observation,
      input.discount_amount ?? currentSale.discount_amount,
      input.discount_type ?? currentSale.discount_type,
      input.status ?? currentSale.status,
      currentSale.id,
    );
    const saleRepository = new SalesRepository();
    await saleRepository.save(sale);
  }

  private async getCurrentSale(id: number) {
    const salesRepository = new SalesRepository();
    return await salesRepository.getSale(id);
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

  private preparePaymentMethods(input: UpdateSaleInputData) {
    if (!input.sale_payment_methods) {
      return undefined;
    }
    return input.sale_payment_methods.map(
      paymentMethod =>
        new Payment(paymentMethod.type, paymentMethod.installment),
    );
  }

  private prepareProducts(input: UpdateSaleInputData) {
    if (!input.sale_products) {
      return undefined;
    }
    return input.sale_products.map(
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
