import CreatePromotionCategoryInputData from '@app/src/Promotions/Application/Dtos/PromotionsCategories/CreatePromotionCategoryInputData';
import { Request } from 'express';

export default class CreatePromotionCategoryFactory {
  static fromRequest(req: Request) {
    return new CreatePromotionCategoryInputData(req.body.name);
  }
}
