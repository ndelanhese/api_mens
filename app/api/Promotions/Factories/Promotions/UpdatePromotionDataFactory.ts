import UpdatePromotionDateInputData from '@app/src/Promotions/Application/Dtos/Promotions/UpdatePromotionStatusInputData';
import { Request } from 'express';

export default class UpdatePromotionDateFactory {
  static fromRequest(req: Request) {
    return new UpdatePromotionDateInputData(
      Number(req.params.id),
      req.body.initial_date,
      req.body.final_date,
    );
  }
}
