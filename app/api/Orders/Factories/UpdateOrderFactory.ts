import UpdateOrderInputData from '@app/src/Orders/Application/Dtos/UpdateOrderInputData';
import { Request } from 'express';

export default class UpdateOrderFactory {
  static fromRequest(req: Request) {
    return new UpdateOrderInputData(
      Number(req.params.id),
      req.body.customer_id,
      req.body.user_id,
      req.body.products,
      req.body.observation,
      req.body.description,
      req.body.status,
    );
  }
}
