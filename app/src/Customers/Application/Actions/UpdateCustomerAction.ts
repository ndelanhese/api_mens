import Address from '../../Domain/Entities/Address';
import Customer from '../../Domain/Entities/Customer';
import AddressesModel from '../../Infrastructure/Models/AddressesModel';
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
    await this.updateAddress(input);
  }

  private async updateAddress(input: UpdateCustomerInputData) {
    if (input.address) {
      const { address: inputData } = input;
      await this.validateCep(inputData.postal_code);
      const address = new Address(
        inputData.address,
        inputData.number,
        inputData.district,
        inputData.postal_code,
        inputData.city,
        inputData.state,
        inputData.id,
      );
      const addressesModel = new AddressesModel();
      await addressesModel.updateAddress(address);
      return;
    }
    return;
  }
}
