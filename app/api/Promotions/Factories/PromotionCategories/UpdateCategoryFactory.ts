import UpdatePromotionCategoryInputData from '@app/src/Promotions/Application/Dtos/PromotionsCategories/UpdatePromotionCategoryInputData';
import PromotionCategory from '@app/src/Promotions/Domain/Entities/PromotionCategory';
import { Request } from 'express';

import { ICategory } from './UpdateCategoryFactory.types';

export default class UpdatePromotionCategoryFactory {
  static fromRequest(req: Request) {
    return new UpdatePromotionCategoryInputData(
      Number(req.params.id),
      req.body.name,
    );
  }
  static fromCurrentPromotionCategory(brand: ICategory) {
    return new PromotionCategory(brand.name, brand.id);
  }
}
