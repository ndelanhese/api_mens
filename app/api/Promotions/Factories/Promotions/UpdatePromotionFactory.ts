import UpdatePromotionInputData from '@app/src/Promotions/Application/Dtos/Promotions/UpdatePromotionInputData';
import { Request } from 'express';

export default class UpdatePromotionFactory {
  static fromRequest(req: Request) {
    return new UpdatePromotionInputData(
      Number(req.params.id),
      req.body.name,
      req.body.description,
      req.body.initial_date,
      req.body.final_date,
      req.body.promotion_category_id,
      req.body.products,
      req.body.status,
      req.body.discount_amount,
      req.body.discount_type,
    );
  }
}
