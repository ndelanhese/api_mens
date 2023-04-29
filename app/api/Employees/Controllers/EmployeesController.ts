import CreateEmployeeAction from '@app/src/Employees/Application/Actions/CreateEmployeeAction';
import DeleteEmployeeAction from '@app/src/Employees/Application/Actions/DeleteEmployeeAction';
import UpdateEmployeeAction from '@app/src/Employees/Application/Actions/UpdateEmployeeAction';
import BaseController from '@base-controller/BaseController';
import HttpError from '@exceptions/HttpError';
import { Request, Response } from 'express';

import CreateEmployeeFactory from '../Factories/CreateEmployeeFactory';
import DeleteEmployeeFactory from '../Factories/DeleteEmployeeFactory';
import UpdateEmployeeFactory from '../Factories/UpdateEmployeeFactory';
import EmployeesModel from '../Models/EmployeesModel';

import {
  IAddress,
  IEmployee,
  IEmployeeAddressData,
} from './EmployeesController.types';

export default class EmployeesController extends BaseController {
  private employeesModel: EmployeesModel;

  constructor() {
    super();
    this.employeesModel = new EmployeesModel();
  }

  public async getEmployees(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'employees_read');
      const cache = await this.getCache('employees');
      if (cache) return res.status(200).json(cache);
      const employees = await this.employeesModel.getEmployees();
      const employeeWithAddresses = employees.map(employee => {
        const addresses = this.prepareEmployeeAddresses(
          employee.employee_addresses,
        );
        return this.prepareEmployeeWithAddresses(employee, addresses);
      });
      await this.createCache('employees', employeeWithAddresses);
      return res.status(200).json(employeeWithAddresses);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async getEmployee(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'employees_read');
      const { id } = req.params;
      const cacheKey = `employee-${id}`;
      const cache = await this.getCache(cacheKey);
      if (cache) return res.status(200).json(cache);
      const employee = await this.employeesModel.getEmployee(Number(id));
      const addresses = this.prepareEmployeeAddresses(
        employee.employee_addresses,
      );
      const employeeWithAddresses = this.prepareEmployeeWithAddresses(
        employee,
        addresses,
      );
      await this.createCache(cacheKey, employeeWithAddresses);
      return res.status(200).json(employeeWithAddresses);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async createEmployee(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      // await this.verifyPermission(req, 'employees_create');
      const employeeInputData = CreateEmployeeFactory.fromRequest(req);
      const employeeAction = new CreateEmployeeAction();
      const employeeId = (
        await employeeAction.execute(employeeInputData)
      ).getId();
      await this.deleteCache('employees');
      return res.status(200).json(employeeId);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async updateEmployee(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'employees_update');
      const employeeInputData = UpdateEmployeeFactory.fromRequest(req);
      const employeeAction = new UpdateEmployeeAction();
      const currentEmployee = await this.employeesModel.getEmployee(
        employeeInputData.id,
      );
      if (!currentEmployee)
        throw new HttpError(404, 'Funcionário não encontrado.');
      const currentEmployeeInputData =
        UpdateEmployeeFactory.fromCurrentEmployee(currentEmployee);
      await employeeAction.execute(employeeInputData, currentEmployeeInputData);
      await this.deleteCache('employees');
      return res.status(200).json('Funcionário atualizado com sucesso.');
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async deleteEmployee(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'employees_delete');
      const employeeInputData = DeleteEmployeeFactory.fromRequest(req);
      const employeeAction = new DeleteEmployeeAction();
      await employeeAction.execute(employeeInputData);
      await this.deleteCache('employees');
      return res.status(200).json('Funcionário deletado com sucesso.');
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  private prepareEmployeeAddresses(addresses: IEmployeeAddressData[]) {
    return addresses.map(address => address.address);
  }

  private prepareEmployeeWithAddresses(
    employee: IEmployee,
    addresses: IAddress[],
  ) {
    return {
      id: employee.id,
      name: employee.name,
      cpf: employee.cpf,
      rg: employee.rg,
      birth_date: employee.birth_date,
      phone: employee.phone,
      pis_pasep: employee.pis_pasep,
      admission_date: employee.admission_date,
      resignation_date: employee.resignation_date,
      status: employee.status,
      addresses: addresses,
    };
  }
}
