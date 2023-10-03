import { capitalizeWords } from '@app/src/Shared/Infrastructure/Utils/String';

import Address from '../../Domain/Entities/Address';
import Employee from '../../Domain/Entities/Employee';
import AddressesModel from '../../Infrastructure/Models/AddressesModel';
import EmployeesRepository from '../../Infrastructure/Repositories/EmployeesRepository';
import UpdateEmployeeInputData from '../Dtos/UpdateEmployeeInputData';

import EmployeeAction from './EmployeeAction';

export default class UpdateEmployeeAction extends EmployeeAction {
  async execute(
    input: UpdateEmployeeInputData,
    currentValue: Employee,
  ): Promise<void> {
    const employeeRepository = new EmployeesRepository();
    const employee = new Employee(
      capitalizeWords(input.name) || currentValue.getName(),
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
    await this.updateAddress(input);
  }

  private async updateAddress(input: UpdateEmployeeInputData) {
    if (input.address) {
      const { address: inputData } = input;
      await this.validateCep(inputData.postal_code);
      const address = new Address(
        capitalizeWords(inputData.address),
        inputData.number,
        capitalizeWords(inputData.district),
        inputData.postal_code,
        capitalizeWords(inputData.city),
        capitalizeWords(inputData.state),
        inputData.id,
      );
      const addressesModel = new AddressesModel();
      await addressesModel.updateAddress(address);
      return;
    }
    return;
  }
}
