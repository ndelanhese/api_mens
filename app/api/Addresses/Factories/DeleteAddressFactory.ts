import DeleteAddressInputData from '@app/src/Addresses/Application/Dtos/DeleteAddressInputData';
import { Request } from 'express';

export default class DeleteAddressFactory {
  static fromRequest(req: Request) {
    return new DeleteAddressInputData(Number(req.params.id));
  }
}
