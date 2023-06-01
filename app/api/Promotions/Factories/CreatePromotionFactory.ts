import CreatePromotionInputData from '@app/src/Promotions/Application/Dtos/Promotions/CreatePromotionInputData';
import { Request } from 'express';

export default class CreatePromotionFactory {
  static fromRequest(req: Request) {
    return new CreatePromotionInputData(
      req.body.name,
      req.body.description,
      req.body.promotion_category_id,
      req.body.products,
      req.body.initial_date,
      req.body.final_date,
      req.body.status,
      req.body.discount_amount,
      req.body.discount_type,
    );
  }
}
