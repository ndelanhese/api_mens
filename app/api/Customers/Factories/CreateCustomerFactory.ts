import CreateCustomerInputData from '@app/src/Customers/Application/Dtos/CreateCustomerInputData';
import Address from '@app/src/Customers/Domain/Entities/Address';
import getDate from '@app/src/Shared/Infrastructure/Utils/Date';
import { removeMask } from '@app/src/Shared/Infrastructure/Utils/Formatter';
import { Request } from 'express';

export default class CreateCustomerFactory {
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
    return new CreateCustomerInputData(
      req.body.name,
      removeMask(req.body.cpf),
      getDate(req.body.birth_date),
      removeMask(req.body.phone),
      req.body.status,
      address,
      removeMask(req.body.rg),
    );
  }
}
