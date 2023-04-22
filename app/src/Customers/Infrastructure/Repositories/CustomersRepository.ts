import Customer from '../../Domain/Entities/Customer';
import CustomersModel from '../Models/CustomersModel';

export default class CustomerRepository {
  private userModel: CustomersModel;

  constructor() {
    this.userModel = new CustomersModel();
  }

  async save(user: Customer): Promise<Customer> {
    if (user.getId()) {
      this.update(user);
    }
    return this.create(user);
  }

  async create(user: Customer): Promise<Customer> {
    const { id } = await this.userModel.createCustomer(user);
    return user.setId(id);
  }

  async delete(userId: number): Promise<void> {
    await this.userModel.deleteCustomer(userId);
  }

  async update(user: Customer): Promise<void> {
    await this.userModel.updateCustomer(user);
  }
}
