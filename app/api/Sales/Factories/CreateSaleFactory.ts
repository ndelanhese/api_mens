import CreateSaleInputData from '@app/src/Sales/Application/Dtos/CreateSaleInputData';
import { Request } from 'express';

export default class CreateSaleFactory {
  static fromRequest(req: Request) {
    return new CreateSaleInputData(
      req.body.date,
      req.body.total_value,
      req.body.final_value,
      req.body.customer_id,
      req.body.user_id,
      req.body.payments,
      req.body.products,
      req.body.observation,
      req.body.status,
      req.body.discount_amount,
      req.body.discount_type,
    );
  }
}
