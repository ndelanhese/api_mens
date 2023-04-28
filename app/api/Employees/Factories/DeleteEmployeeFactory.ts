import DeleteEmployeeInputData from '@app/src/Employees/Application/Dtos/DeleteEmployeeInputData';
import { Request } from 'express';

export default class DeleteEmployeeFactory {
  static fromRequest(req: Request) {
    return new DeleteEmployeeInputData(Number(req.params.id));
  }
}
