import HttpError from '@app/src/Shared/Domain/Exceptions/HttpError';
import { validateCpf as cpfValidate } from '@app/src/Shared/Infrastructure/Utils/CpfCnpjFormatter';
import getDate from '@app/src/Shared/Infrastructure/Utils/Date';

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
    this.validateCpf(customer.getCpf());
    this.validateDate(customer.getBirthDate());
    this.validatePhone(customer.getPhone());
    await customerRepository.update(customer);
  }

  private validateCpf(cpf: string) {
    if (!cpfValidate(cpf)) {
      throw new HttpError(400, 'CPF invalido');
    }
    return;
  }

  private validateDate(date: Date) {
    const currentDate = getDate();
    if (date > currentDate) {
      throw new HttpError(400, 'Data de nascimento invalida');
    }
    return;
  }

  private validatePhone(phone: string) {
    const ONLY_NUMBERS_REGEX = /^\d+$/;
    const isOnlyNumbers = ONLY_NUMBERS_REGEX.test(phone);
    if (!isOnlyNumbers) {
      throw new HttpError(400, 'Telefone invalido');
    }
    return;
  }
}
//TODO -> adicionar atualização de endereço
