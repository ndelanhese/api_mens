import DeleteRoleInputData from '@app/src/Roles/Application/Dtos/DeleteRoleInputData';
import { Request } from 'express';

export default class DeleteRoleFactory {
  static fromRequest(req: Request) {
    return new DeleteRoleInputData(Number(req.params.id));
  }
}
