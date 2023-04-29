import { removeMask } from '@app/src/Shared/Domain/Utils/Formatter';
import CreateSupplierInputData from '@app/src/Suppliers/Application/Dtos/CreateSupplierInputData';
import Address from '@app/src/Suppliers/Domain/Entities/Address';
import { Request } from 'express';

export default class CreateSupplierFactory {
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
    return new CreateSupplierInputData(
      req.body.contact_name,
      req.body.corporate_name,
      removeMask(req.body.cnpj),
      req.body.status,
      address,
    );
  }
}
