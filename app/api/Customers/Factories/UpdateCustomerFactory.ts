import UpdateCustomerInputData from '@app/src/Customers/Application/Dtos/UpdateCustomerInputData';
import Customer from '@app/src/Customers/Domain/Entities/Customer';
import getDate from '@app/src/Shared/Infrastructure/Utils/Date';
import { removeMask } from '@app/src/Shared/Infrastructure/Utils/Formatter';
import { Request } from 'express';

import { ICustomer } from './UpdateCustomerFactory.types';

export default class UpdateCustomerFactory {
  static fromRequest(req: Request) {
    return new UpdateCustomerInputData(
      Number(req.params.id),
      req.body.name,
      req.body.cpf ? removeMask(req.body.cpf) : undefined,
      getDate(req.body.birth_date),
      req.body.phone ? removeMask(req.body.phone) : undefined,
      req.body.status,
      req.body.rg ? removeMask(req.body.rg) : undefined,
      req.body.address,
    );
  }
  static fromCurrentCustomer(customer: ICustomer) {
    return new Customer(
      customer.name,
      customer.cpf,
      customer.birth_date,
      customer.phone,
      customer.status,
      undefined,
      customer.rg,
      customer.id,
    );
  }
}
