import UpdateCustomerInputData from '@app/src/Customers/Application/Dtos/UpdateCustomerInputData';
import Customer from '@app/src/Customers/Domain/Entities/Customer';
import getDate from '@app/src/Shared/Domain/Utils/Date';
import { removeMask } from '@app/src/Shared/Domain/Utils/Formatter';
import { Request } from 'express';

import { ICustomer } from './UpdateCustomerFactory.types';

export default class UpdateCustomerFactory {
  static fromRequest(req: Request) {
    return new UpdateCustomerInputData(
      Number(req.params.id),
      req.body.name,
      removeMask(req.body.cpf),
      getDate(req.body.birth_date),
      removeMask(req.body.phone),
      req.body.status,
      removeMask(req.body.rg),
    );
  }
  static fromCurrentCustomer(user: ICustomer) {
    return new Customer(
      user.name,
      user.cpf,
      user.birth_date,
      user.phone,
      user.status,
      undefined,
      user.rg,
      user.id,
    );
  }
}
