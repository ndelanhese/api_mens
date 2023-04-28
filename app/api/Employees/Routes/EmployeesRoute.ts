import express, { Router } from 'express';

import EmployeesController from '../Controllers/EmployeesController';
import createEmployeeMiddleware from '../Middleware/CreateEmployeeMiddleware';
import deleteEmployeeMiddleware from '../Middleware/DeleteEmployeeMiddleware';
import updateEmployeeMiddleware from '../Middleware/UpdateEmployeeMiddleware';

export default class EmployeesRoute {
  private employeesRoute: Router;

  private employeeController: EmployeesController;

  constructor() {
    this.employeesRoute = express.Router();
    this.employeeController = new EmployeesController();
    this.setup();
  }

  private setup(): void {
    const getEmployees = this.employeeController.getEmployees.bind(
      this.employeeController,
    );
    const getEmployee = this.employeeController.getEmployee.bind(
      this.employeeController,
    );
    const createEmployee = this.employeeController.createEmployee.bind(
      this.employeeController,
    );
    const updateEmployee = this.employeeController.updateEmployee.bind(
      this.employeeController,
    );
    const deleteEmployee = this.employeeController.deleteEmployee.bind(
      this.employeeController,
    );

    this.employeesRoute.get('/', getEmployees);
    this.employeesRoute.get('/:id', getEmployee);
    this.employeesRoute.post('/', createEmployeeMiddleware, createEmployee);
    this.employeesRoute.put('/:id', updateEmployeeMiddleware, updateEmployee);
    this.employeesRoute.delete(
      '/:id',
      deleteEmployeeMiddleware,
      deleteEmployee,
    );
  }

  get employeeRoute() {
    return this.employeesRoute;
  }
}
