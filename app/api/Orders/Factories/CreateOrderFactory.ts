import CreateOrderInputData from '@app/src/Orders/Application/Dtos/CreateOrderInputData';
import { Request } from 'express';

export default class CreateOrderFactory {
  static fromRequest(req: Request) {
    return new CreateOrderInputData(
      req.body.date,
      req.body.customer_id,
      req.body.user_id,
      req.body.products,
      req.body.observation,
      req.body.description,
      req.body.status,
    );
  }
}
