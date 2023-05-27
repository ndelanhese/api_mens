import Customer from '../../Domain/Entities/Customer';
import CustomerRepository from '../../Infrastructure/Repositories/CustomersRepository';
import CreateCustomerInputData from '../Dtos/CreateCustomerInputData';

import CustomerAction from './CustomerAction';

export default class CreateCustomerAction extends CustomerAction {
  async execute(input: CreateCustomerInputData): Promise<Customer> {
    const customerRepository = new CustomerRepository();
    const customer = new Customer(
      input.name,
      input.cpf,
      input.birth_date,
      input.phone,
      input.status,
      input.address,
      input.rg,
    );
    this.validateCpf(customer.getCpf());
    this.validateDate(customer.getBirthDate());
    this.validatePhone(customer.getPhone());
    await this.validateCep(customer.getAddress()?.getPostalCode());
    return await customerRepository.save(customer);
  }
}
