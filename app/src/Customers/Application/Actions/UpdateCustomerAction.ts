import Customer from '../../Domain/Entities/Customer';
import CustomersRepository from '../../Infrastructure/Repositories/CustomersRepository';
import UpdateCustomerInputData from '../Dtos/UpdateCustomerInputData';

import CustomerAction from './CustomerAction';

export default class UpdateCustomerAction extends CustomerAction {
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
    this.validateCpf(customer.getCpf());
    this.validateDate(customer.getBirthDate());
    this.validatePhone(customer.getPhone());
    await customerRepository.update(customer);
  }
}
//TODO -> adicionar atualização de endereço
