import Customer from '../../Domain/Entities/Customer';
import CustomerRepository from '../../Infrastructure/Repositories/CustomersRepository';
import CreateCustomerInputData from '../Dtos/CreateCustomerInputData';

export default class CreateCustomerAction {
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
    return await customerRepository.save(customer);
  }
}
