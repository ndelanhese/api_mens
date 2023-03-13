import UploadRolesAndPermissionsInputData from '@app/src/Users/Application/Dtos/UpdateRolesAndPermissionsInputData';
import { Request } from 'express';

export default class UpdateRolesAndPermissionsFactory {
  static fromRequest(req: Request) {
    return new UploadRolesAndPermissionsInputData(
      Number(req.params.id),
      req.body.role_id,
      req.body.permissions,
    );
  }
}
