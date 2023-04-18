import DeleteUserInputData from '@app/src/Users/Application/Dtos/DeleteUserInputData';
import { Request } from 'express';

export default class DeleteUserFactory {
  static fromRequest(req: Request) {
    return new DeleteUserInputData(Number(req.params.id));
  }
}
