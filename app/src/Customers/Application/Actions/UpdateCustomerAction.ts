import Customer from '../../Domain/Entities/Customer';
import CustomersRepository from '../../Infrastructure/Repositories/CustomersRepository';
import UpdateCustomerInputData from '../Dtos/UpdateCustomerInputData';

export default class UpdateCustomerAction {
  async execute(
    input: UpdateCustomerInputData,
    currentValue: Customer,
  ): Promise<void> {
    const customerRepository = new CustomersRepository();
    const customer = new Customer(
      input.name || currentValue.getName(),
      input.cpf || currentValue.getCpf(),
      input.birth_date || currentValue.getBirthDate(),
      input.phone || currentValue.getPhone(),
      input.status || currentValue.getStatus(),
      undefined,
      input.rg || currentValue.getRg(),
      input.id || currentValue.getId(),
    );
    await customerRepository.update(customer);
  }
}
