import CustomerRepository from '../../Infrastructure/Repositories/CustomersRepository';
import DeleteCustomerInputData from '../Dtos/DeleteCustomerInputData';

export default class DeleteCustomerAction {
  async execute(input: DeleteCustomerInputData): Promise<void> {
    const customerRepository = new CustomerRepository();
    await customerRepository.delete(input.id);
  }
}
