import UpdateUserInputData from '@app/src/Users/Application/Dtos/UpdateUserInputData';
import User from '@app/src/Users/Domain/Entities/User';
import { hashSync } from 'bcryptjs';
import { Request } from 'express';

import { IUser } from './UpdateUserFactory.types';

export default class UpdateUserFactory {
  static fromRequest(req: Request) {
    const password = req.body.password
      ? hashSync(String(req.body.password), 10)
      : undefined;

    return new UpdateUserInputData(
      Number(req.params.id),
      req.body.user,
      req.body.email,
      password,
      req.body.status,
      req.body.employee_id,
    );
  }
  static fromCurrentUser(user: IUser) {
    return new User(
      user.user,
      user.email,
      user.password,
      user.status,
      user.employee_id,
      user.id,
    );
  }
}
