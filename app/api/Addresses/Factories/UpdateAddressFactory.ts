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
  static fromCurrentAddress(address: IAddress) {
    return new Address(
      address.address,
      address.number,
      address.district,
      address.postal_code,
      address.city,
      address.state,
      address.id,
    );
  }
}
