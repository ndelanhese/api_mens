import UpdateAddressInputData from '@app/src/Addresses/Application/Dtos/UpdateAddressInputData';
import Address from '@app/src/Addresses/Domain/Entities/Address';
import { Request } from 'express';

import { IAddress } from './UpdateAddressFactory.types';

export default class UpdateAddressFactory {
  static fromRequest(req: Request) {
    return new UpdateAddressInputData(
      Number(req.params.id),
      req.body.address,
      req.body.number,
      req.body.district,
      req.body.postal_code,
      req.body.city,
      req.body.state,
    );
  }
  static fromCurrentAddress(brand: IAddress) {
    return new Address(
      brand.address,
      brand.number,
      brand.district,
      brand.postal_code,
      brand.city,
      brand.state,
    );
  }
}
