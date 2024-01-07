import UpdateEmployeeInputData from '@app/src/Employees/Application/Dtos/UpdateEmployeeInputData';
import Employee from '@app/src/Employees/Domain/Entities/Employee';
import getDate from '@app/src/Shared/Infrastructure/Utils/Date';
import { removeMask } from '@app/src/Shared/Infrastructure/Utils/Formatter';
import { Request } from 'express';

import { IEmployee } from './UpdateEmployeeFactory.types';

export default class UpdateEmployeeFactory {
  static fromRequest(req: Request) {
    return new UpdateEmployeeInputData(
      Number(req.params.id),
      req.body.name,
      req.body.cpf ? removeMask(req.body.cpf) : undefined,
      getDate(req.body.birth_date),
      req.body.phone ? removeMask(req.body.phone) : undefined,
      req.body.pis_pasep ? removeMask(req.body.pis_pasep) : undefined,
      getDate(req.body.admission_date),
      req.body.status,
      req.body.rg ? removeMask(req.body.rg) : undefined,
      getDate(req.body?.resignation_date),
      req.body.address,
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
