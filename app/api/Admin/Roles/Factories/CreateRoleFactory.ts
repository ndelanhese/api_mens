import CreateRoleInputData from '@app/src/Roles/Application/Dtos/CreateRoleInputData';
import { Request } from 'express';

export default class CreateRoleFactory {
  static fromRequest(req: Request) {
    return new CreateRoleInputData(
      req.body.name,
      req.body.description,
      req.body.permissions,
    );
  }
}
