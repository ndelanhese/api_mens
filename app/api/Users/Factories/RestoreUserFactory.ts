import RestoreUserInputData from '@app/src/Users/Application/Dtos/RestoreUserInputData';
import { Request } from 'express';

export default class RestoreUserFactory {
  static fromRequest(req: Request) {
    return new RestoreUserInputData(Number(req.params.id));
  }
}
