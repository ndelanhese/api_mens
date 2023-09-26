import ListFactory from '@app/api/Shared/Factories/ListFactory';
import CreateEmployeeAction from '@app/src/Employees/Application/Actions/CreateEmployeeAction';
import DeleteEmployeeAction from '@app/src/Employees/Application/Actions/DeleteEmployeeAction';
import UpdateEmployeeAction from '@app/src/Employees/Application/Actions/UpdateEmployeeAction';
import { EmployeeStatusTypes } from '@app/src/Employees/Domain/Enums/EmployeeStatusTypes';
import { formatCpf } from '@app/src/Shared/Infrastructure/Utils/CpfCnpjFormatter';
import { formatLocaleDateString } from '@app/src/Shared/Infrastructure/Utils/Date';
import {
  formatPhoneNumber,
  formatPisPasep,
  formatPostaCode,
  formatRG,
} from '@app/src/Shared/Infrastructure/Utils/Formatter';
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
      const cacheKey = `employees-${JSON.stringify(req.query)}`;
      const cache = await this.getCache(cacheKey);
      if (cache) return res.status(200).json(cache);
      const { status } = ListFactory.fromRequest(req);
      const employees = await this.employeesModel.getEmployees(status);
      const employeeWithAddresses = employees.map(employee => {
        const addresses = this.prepareEmployeeAddresses(
          employee.employee_addresses,
        );
        return this.prepareEmployeeWithAddresses(employee, addresses);
      });
      const data = this.returnInData(employeeWithAddresses);
      await this.createCache(cacheKey, data);
      return res.status(200).json(data);
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
      const cacheKey = `employees-${id}`;
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
      await this.verifyPermission(req, 'employees_create');
      const employeeInputData = CreateEmployeeFactory.fromRequest(req);
      const employeeAction = new CreateEmployeeAction();
      const employeeId = (
        await employeeAction.execute(employeeInputData)
      ).getId();
      await this.deleteCache('employees');
      return res.status(201).json(employeeId);
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
      return res.status(204).send();
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
      return res.status(204).send();
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async getStatus(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'employees_read');
      const cache = await this.getCache('employees-status');
      if (cache) return res.status(200).json(cache);
      const status = EmployeeStatusTypes.labelsToKeyValue();
      await this.createCache('employees-status', status);
      return res.status(200).json(status);
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
      cpf: formatCpf(employee.cpf),
      rg: formatRG(employee.rg ?? ''),
      birth_date: formatLocaleDateString(employee.birth_date),
      phone: formatPhoneNumber(employee.phone),
      pis_pasep: formatPisPasep(employee.pis_pasep),
      admission_date: formatLocaleDateString(employee.admission_date),
      resignation_date: formatLocaleDateString(employee.resignation_date),
      status: employee.status,
      addresses: addresses.map(address => ({
        id: address.id,
        address: address.address,
        number: address.number,
        district: address.district,
        postal_code: formatPostaCode(address.postal_code),
        city: address.city,
        state: address.state,
      })),
    };
  }
}
