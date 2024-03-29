import { removeMask } from '@app/src/Shared/Infrastructure/Utils/Formatter';
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
      req.body.cnpj ? removeMask(req.body.cnpj) : undefined,
      req.body.status,
      req.body.address,
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
