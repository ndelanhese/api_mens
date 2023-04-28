import UpdateEmployeeInputData from '@app/src/Employees/Application/Dtos/UpdateEmployeeInputData';
import Employee from '@app/src/Employees/Domain/Entities/Employee';
import getDate from '@app/src/Shared/Domain/Utils/Date';
import { removeMask } from '@app/src/Shared/Domain/Utils/Formatter';
import { Request } from 'express';

import { IEmployee } from './UpdateEmployeeFactory.types';

export default class UpdateEmployeeFactory {
  static fromRequest(req: Request) {
    return new UpdateEmployeeInputData(
      Number(req.params.id),
      req.body.name,
      removeMask(req.body.cpf),
      getDate(req.body.birth_date),
      removeMask(req.body.phone),
      removeMask(req.body.pis_pasep),
      getDate(req.body.admission_date),
      req.body.status,
      removeMask(req.body.rg),
      getDate(req.body.resignation_date),
    );
  }
  static fromCurrentEmployee(employee: IEmployee) {
    return new Employee(
      employee.name,
      employee.cpf,
      employee.birth_date,
      employee.phone,
      employee.pis_pasep,
      employee.admission_date,
      employee.status,
      undefined,
      employee.rg,
      employee.resignation_date,
      employee.id,
    );
  }
}
