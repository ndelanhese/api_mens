import DeletePromotionInputData from '@app/src/Promotions/Application/Dtos/Promotions/DeletePromotionInputData';
import { Request } from 'express';

export default class DeletePromotionFactory {
  static fromRequest(req: Request) {
    return new DeletePromotionInputData(Number(req.params.id));
  }
}
