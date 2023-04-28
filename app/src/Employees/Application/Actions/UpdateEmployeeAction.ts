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
    await employeeRepository.update(employee);
  }
}
