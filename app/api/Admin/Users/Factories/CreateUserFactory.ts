import { hashSync } from 'bcryptjs';
import CreateUserInputData from '@app/src/Users/Application/Dtos/CreateUserInputData';
import { Request } from 'express';

export default class CreateUserFactory {
  static fromRequest(req: Request) {
    const password = hashSync(String(req.body.password), 10);
    return new CreateUserInputData(
      req.body.first_name,
      req.body.last_name,
      req.body.phone_number,
      req.body.email,
      password,
      req.body.status,
    );
  }
}
