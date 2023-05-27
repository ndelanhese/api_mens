import CreateAddressInputData from '@app/src/Addresses/Application/Dtos/CreateAddressInputData';
import { Request } from 'express';

export default class CreateAddressFactory {
  static fromRequest(req: Request) {
    return new CreateAddressInputData(
      req.body.address,
      req.body.number,
      req.body.district,
      req.body.postal_code,
      req.body.city,
      req.body.state,
    );
  }
}
