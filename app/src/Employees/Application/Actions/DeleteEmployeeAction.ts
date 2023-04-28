import EmployeeRepository from '../../Infrastructure/Repositories/EmployeesRepository';
import DeleteEmployeeInputData from '../Dtos/DeleteEmployeeInputData';

export default class DeleteEmployeeAction {
  async execute(input: DeleteEmployeeInputData): Promise<void> {
    const employeeRepository = new EmployeeRepository();
    await employeeRepository.delete(input.id);
  }
}
