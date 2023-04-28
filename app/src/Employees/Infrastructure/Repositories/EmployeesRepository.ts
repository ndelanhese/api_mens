import Employee from '../../Domain/Entities/Employee';
import EmployeesModel from '../Models/EmployeesModel';

export default class EmployeeRepository {
  private employeeModel: EmployeesModel;

  constructor() {
    this.employeeModel = new EmployeesModel();
  }

  async save(employee: Employee): Promise<Employee> {
    if (employee.getId()) {
      this.update(employee);
    }
    return this.create(employee);
  }

  async create(employee: Employee): Promise<Employee> {
    const { id } = await this.employeeModel.createEmployee(employee);
    return employee.setId(id);
  }

  async delete(employeeId: number): Promise<void> {
    await this.employeeModel.deleteEmployee(employeeId);
  }

  async update(employee: Employee): Promise<void> {
    await this.employeeModel.updateEmployee(employee);
  }
}
