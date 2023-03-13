import UpdateRoleInputData from '@app/src/Roles/Application/Dtos/UpdateRoleInputData';
import { Request } from 'express';
import { IRole } from './UpdateRoleFactory.types';
import Role from '@app/src/Roles/Domain/Entities/Role';

export default class UpdateRoleFactory {
  static fromRequest(req: Request) {
    return new UpdateRoleInputData(
      Number(req.params.id),
      req.body.name,
      req.body.description,
      req.body.permissions,
    );
  }
  static fromCurrentRole(role: IRole) {
    return new Role(role.name, role.description, role.id);
  }
}
