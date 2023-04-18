import CreateUserInputData from '@app/src/Users/Application/Dtos/CreateUserInputData';
import { hashSync } from 'bcryptjs';
import { Request } from 'express';

export default class CreateUserFactory {
  static fromRequest(req: Request) {
    const password = hashSync(String(req.body.password), 10);
    return new CreateUserInputData(
      req.body.user,
      req.body.email,
      password,
      req.body.status,
      req.body.employee_id,
    );
  }
}
