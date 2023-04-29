import DeleteSupplierInputData from '@app/src/Suppliers/Application/Dtos/DeleteSupplierInputData';
import { Request } from 'express';

export default class DeleteSupplierFactory {
  static fromRequest(req: Request) {
    return new DeleteSupplierInputData(Number(req.params.id));
  }
}
