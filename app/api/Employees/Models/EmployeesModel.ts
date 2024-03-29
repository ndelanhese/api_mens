/* eslint-disable @typescript-eslint/no-explicit-any */
import AddressesModel from '@db-models/AddressesModel';
import EmployeesAddressesModel from '@db-models/EmployeesAddressesModel';
import employeesModel from '@db-models/EmployeesModel';
import HttpError from '@exceptions/HttpError';
import { WhereOptions } from 'sequelize';

import { IEmployee } from './EmployeesModel.types';

export default class ListEmployeesModel {
  public async getEmployees(status?: string): Promise<IEmployee[]> {
    try {
      let whereClause: WhereOptions = {};
      if (status) whereClause = { status };
      const employees: any = await employeesModel.findAll({
        where: whereClause,
        include: [
          {
            model: EmployeesAddressesModel,
            as: 'employee_addresses',
            include: [
              {
                model: AddressesModel,
                as: 'address',
                attributes: [
                  'id',
                  'address',
                  'number',
                  'district',
                  'postal_code',
                  'city',
                  'state',
                ],
              },
            ],
          },
        ],
      });
      return employees;
    } catch (error) {
      throw new HttpError(500, 'Erro ao listar funcionários.', error);
    }
  }

  public async getEmployee(employeeId: number): Promise<IEmployee> {
    try {
      const employees: any = await employeesModel.findByPk(employeeId, {
        include: [
          {
            model: EmployeesAddressesModel,
            as: 'employee_addresses',
            include: [
              {
                model: AddressesModel,
                as: 'address',
                attributes: [
                  'id',
                  'address',
                  'number',
                  'district',
                  'postal_code',
                  'city',
                  'state',
                ],
              },
            ],
          },
        ],
      });
      if (!employees) throw new HttpError(404, 'Funcionário não encontrado.');
      return employees;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, 'Erro ao listar funcionário.', error);
    }
  }
}
