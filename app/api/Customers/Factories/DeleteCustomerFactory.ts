import DeleteCustomerInputData from '@app/src/Customers/Application/Dtos/DeleteCustomerInputData';
import { Request } from 'express';

export default class DeleteCustomerFactory {
  static fromRequest(req: Request) {
    return new DeleteCustomerInputData(Number(req.params.id));
  }
}
