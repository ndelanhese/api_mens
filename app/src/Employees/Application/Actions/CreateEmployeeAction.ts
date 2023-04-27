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
    return await employeeRepository.save(employee);
  }
}
