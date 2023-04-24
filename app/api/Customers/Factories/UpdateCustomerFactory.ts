import UpdateCustomerInputData from '@app/src/Customers/Application/Dtos/UpdateCustomerInputData';
import Customer from '@app/src/Customers/Domain/Entities/Customer';
import { Request } from 'express';

import { ICustomer } from './UpdateCustomerFactory.types';

export default class UpdateCustomerFactory {
  static fromRequest(req: Request) {
    return new UpdateCustomerInputData(
      Number(req.params.id),
      req.body.name,
      req.body.cpf,
      req.body.birth_date,
      req.body.phone,
      req.body.status,
      req.body.rg,
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
