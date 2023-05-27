import HttpError from '@app/src/Shared/Domain/Exceptions/HttpError';
import { validateCpf as cpfValidate } from '@app/src/Shared/Infrastructure/Utils/CpfCnpjFormatter';
import getDate from '@app/src/Shared/Infrastructure/Utils/Date';
import { validatePisPasep as pisPasepValidate } from '@app/src/Shared/Infrastructure/Utils/PisPasep';

import Employee from '../../Domain/Entities/Employee';
import EmployeesRepository from '../../Infrastructure/Repositories/EmployeesRepository';
import UpdateEmployeeInputData from '../Dtos/UpdateEmployeeInputData';

export default class UpdateEmployeeAction {
  async execute(
    input: UpdateEmployeeInputData,
    currentValue: Employee,
  ): Promise<void> {
    const employeeRepository = new EmployeesRepository();
    const employee = new Employee(
      input.name || currentValue.getName(),
      input.cpf || currentValue.getCpf(),
      input.birth_date || currentValue.getBirthDate(),
      input.phone || currentValue.getPhone(),
      input.pis_pasep || currentValue.getPisPasep(),
      input.admission_date || currentValue.getAdmissionDate(),
      input.status || currentValue.getStatus(),
      undefined,
      input.rg || currentValue.getRg(),
      input.resignation_date || currentValue.getResignationDate(),
      input.id || currentValue.getId(),
    );
    this.validatePisPasep(employee.getPisPasep());
    this.validateCpf(employee.getCpf());
    this.validateDate(employee.getBirthDate());
    this.validateAdmissionDate(employee.getAdmissionDate());
    this.validateResignationDate(employee.getResignationDate());
    this.validatePhone(employee.getPhone());
    await employeeRepository.update(employee);
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

  private validateCpf(cpf: string) {
    if (!cpfValidate(cpf)) {
      throw new HttpError(400, 'CPF invalido');
    }
    return;
  }

  private validateDate(date: Date) {
    const currentDate = getDate();
    if (date >= currentDate) {
      throw new HttpError(400, 'Data de nascimento invalida');
    }
    return;
  }

  private validateAdmissionDate(date: Date) {
    const currentDate = getDate();
    if (date >= currentDate) {
      throw new HttpError(400, 'Data de contratação invalida');
    }
    return;
  }

  private validateResignationDate(date?: Date) {
    if (!date) return;
    const currentDate = getDate();
    if (date >= currentDate) {
      throw new HttpError(400, 'Data de demissão invalida');
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
//TODO -> Verificar possibilidade de criar serviço de validação, passando essas validações para um service
