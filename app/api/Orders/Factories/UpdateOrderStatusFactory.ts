import UpdateOrderStatusInputData from '@app/src/Orders/Application/Dtos/UpdateOrderStatusInputData';
import { Request } from 'express';

export default class UpdateOrderStatusFactory {
  static fromRequest(req: Request) {
    return new UpdateOrderStatusInputData(
      Number(req.params.id),
      req.body.observation,
      req.body.status,
    );
  }
}
