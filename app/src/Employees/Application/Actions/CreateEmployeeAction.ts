import BrasilApiService from '@app/src/Extras/Infrastructure/Services/BrasilApiService';
import { validatePisPasep as pisPasepValidate } from '@app/src/Shared/Infrastructure/Utils/PisPasep';
import HttpError from '@exceptions/HttpError';

import Employee from '../../Domain/Entities/Employee';
import EmployeeRepository from '../../Infrastructure/Repositories/EmployeesRepository';
import CreateEmployeeInputData from '../Dtos/CreateEmployeeInputData';

export default class CreateEmployeeAction {
  async execute(input: CreateEmployeeInputData): Promise<Employee> {
    const employeeRepository = new EmployeeRepository();
    const employee = new Employee(
      input.name,
      input.cpf,
      input.birth_date,
      input.phone,
      input.pis_pasep,
      input.admission_date,
      input.status,
      input.address,
      input.rg,
      input.resignation_date,
    );
    this.validatePisPasep(employee.getPisPasep());
    await this.validateCep(employee.getAddress()?.getPostalCode());
    return await employeeRepository.save(employee);
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

  private validatePisPasep(pis_pasep?: string) {
    if (!pis_pasep) {
      throw new HttpError(404, 'PIS PASEP inválido');
    }
    const isValidPisPasep = pisPasepValidate(pis_pasep);
    if (!isValidPisPasep) {
      throw new HttpError(404, 'PIS PASEP inválido');
    }
    return;
  }
}
