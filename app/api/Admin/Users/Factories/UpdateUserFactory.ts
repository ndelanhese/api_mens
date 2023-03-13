import { Request } from 'express';
import UpdateUserInputData from '@app/src/Users/Application/Dtos/UpdateUserInputData';

import User from '@app/src/Users/Domain/Entities/User';
import { IUser } from './UpdateUserFactory.types';

export default class UpdateUserFactory {
  static fromRequest(req: Request) {
    return new UpdateUserInputData(
      Number(req.params.id),
      req.body.first_name,
      req.body.last_name,
      req.body.phone_number,
      req.body.email,
      req.body.password,
      req.body.status,
    );
  }
  static fromCurrentUser(user: IUser) {
    return new User(
      user.first_name,
      user.last_name,
      user.phone_number,
      user.email,
      user.password,
      user.status,
      user.id,
    );
  }
}
