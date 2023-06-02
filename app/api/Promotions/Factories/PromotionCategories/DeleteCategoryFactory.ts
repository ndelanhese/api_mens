import DeletePromotionCategoryInputData from '@app/src/Promotions/Application/Dtos/PromotionsCategories/DeletePromotionCategoryInputData';
import { Request } from 'express';

export default class DeletePromotionCategoryFactory {
  static fromRequest(req: Request) {
    return new DeletePromotionCategoryInputData(Number(req.params.id));
  }
}
