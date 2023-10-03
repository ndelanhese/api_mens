import Promotion from '@app/src/Promotions/Domain/Entities/Promotion';
import PromotionCategory from '@app/src/Promotions/Domain/Entities/PromotionCategory';
import PromotionProduct from '@app/src/Promotions/Domain/Entities/PromotionProduct';
import PromotionsCategoriesModel from '@app/src/Promotions/Infrastructure/Models/PromotionCategory';
import PromotionsRepository from '@app/src/Promotions/Infrastructure/Repositories/PromotionsRepository';
import getDate from '@app/src/Shared/Infrastructure/Utils/Date';
import {
  capitalizeFirstLetter,
  capitalizeWords,
} from '@app/src/Shared/Infrastructure/Utils/String';

import CreatePromotionInputData from '../../Dtos/Promotions/CreatePromotionInputData';

export default class CreatePromotionAction {
  async execute(input: CreatePromotionInputData) {
    const promotionsRepository = new PromotionsRepository();
    const promotionCategory = await this.getCategory(
      input.promotion_category_id,
    );
    const products = input.promotion_products?.map(
      product => new PromotionProduct(product.id),
    );
    const promotion = new Promotion(
      capitalizeWords(input.name),
      capitalizeFirstLetter(input.description),
      promotionCategory,
      products,
      input.discount_amount,
      input.discount_type,
      getDate(input.initial_date),
      getDate(input.final_date),
      input.status,
    );
    return await promotionsRepository.save(promotion);
  }

  private async getCategory(category_id: number) {
    const categoryModel = new PromotionsCategoriesModel();
    const category = await categoryModel.getCategoryById(category_id);
    return new PromotionCategory(category.name, category.id);
  }
}
