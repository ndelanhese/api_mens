import CreateEmployeeInputData from '@app/src/Employees/Application/Dtos/CreateEmployeeInputData';
import Address from '@app/src/Employees/Domain/Entities/Address';
import getDate from '@app/src/Shared/Infrastructure/Utils/Date';
import { removeMask } from '@app/src/Shared/Infrastructure/Utils/Formatter';
import { Request } from 'express';

export default class CreateEmployeeFactory {
  static fromRequest(req: Request) {
    const { address: addressData } = req.body;
    const address = new Address(
      addressData.address,
      addressData.number,
      addressData.district,
      removeMask(addressData.postal_code),
      addressData.city,
      addressData.state,
    );
    return new CreateEmployeeInputData(
      req.body.name,
      removeMask(req.body.cpf),
      getDate(req.body.birth_date),
      removeMask(req.body.phone),
      removeMask(req.body.pis_pasep),
      getDate(req.body.admission_date),
      req.body.status,
      address,
      removeMask(req.body.rg),
      req.body?.resignation_date
        ? getDate(req.body.resignation_date)
        : undefined,
    );
  }
}
