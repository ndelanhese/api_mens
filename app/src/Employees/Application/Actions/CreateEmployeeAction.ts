import Employee from '../../Domain/Entities/Employee';
import EmployeeRepository from '../../Infrastructure/Repositories/EmployeesRepository';
import CreateEmployeeInputData from '../Dtos/CreateEmployeeInputData';

import EmployeeAction from './EmployeeAction';

export default class CreateEmployeeAction extends EmployeeAction {
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
    this.validateCpf(employee.getCpf());
    this.validateDate(employee.getBirthDate());
    this.validateAdmissionDate(employee.getAdmissionDate());
    this.validateResignationDate(employee.getResignationDate());
    this.validatePhone(employee.getPhone());
    await this.validateCep(employee.getAddress()?.getPostalCode());
    return await employeeRepository.save(employee);
  }
}
