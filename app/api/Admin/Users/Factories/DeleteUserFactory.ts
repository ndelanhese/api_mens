import { Request } from 'express';
import DeleteUserInputData from '@app/src/Users/Application/Dtos/DeleteUserInputData';

export default class DeleteUserFactory {
  static fromRequest(req: Request) {
    return new DeleteUserInputData(Number(req.params.id));
  }
}
