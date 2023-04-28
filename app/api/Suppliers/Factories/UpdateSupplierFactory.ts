import { removeMask } from '@app/src/Shared/Domain/Utils/Formatter';
import UpdateSupplierInputData from '@app/src/Suppliers/Application/Dtos/UpdateSupplierInputData';
import Supplier from '@app/src/Suppliers/Domain/Entities/Supplier';
import { Request } from 'express';

import { ISupplier } from './UpdateSupplierFactory.types';

export default class UpdateSupplierFactory {
  static fromRequest(req: Request) {
    return new UpdateSupplierInputData(
      Number(req.params.id),
      req.body.contact_name,
      req.body.corporate_name,
      removeMask(req.body.cnpj),
      req.body.status,
    );
  }
  static fromCurrentSupplier(employee: ISupplier) {
    return new Supplier(
      employee.contact_name,
      employee.corporate_name,
      employee.cnpj,
      employee.status,
      undefined,
      employee.id,
    );
  }
}
