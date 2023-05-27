import BrasilApiService from '@app/src/Extras/Infrastructure/Services/BrasilApiService';
import { validateCpf as cpfValidate } from '@app/src/Shared/Infrastructure/Utils/CpfCnpjFormatter';
import getDate from '@app/src/Shared/Infrastructure/Utils/Date';
import HttpError from '@exceptions/HttpError';

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
    this.validateCpf(customer.getCpf());
    this.validateDate(customer.getBirthDate());
    this.validatePhone(customer.getPhone());
    await this.validateCep(customer.getAddress()?.getPostalCode());
    return await customerRepository.save(customer);
  }

  private async validateCep(cep?: string) {
    if (!cep) {
      throw new HttpError(404, 'CEP inválido');
    }
    const brasilApiService = new BrasilApiService();
    const hasCep = await brasilApiService.getAddressByCep(cep);
    if (!hasCep) {
      throw new HttpError(404, 'CEP inválido');
    }
    return;
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
