import Promotion from '@app/src/Promotions/Domain/Entities/Promotion';
import PromotionCategory from '@app/src/Promotions/Domain/Entities/PromotionCategory';
import PromotionProduct from '@app/src/Promotions/Domain/Entities/PromotionProduct';
import PromotionsCategoriesModel from '@app/src/Promotions/Infrastructure/Models/PromotionCategory';
import PromotionsRepository from '@app/src/Promotions/Infrastructure/Repositories/PromotionsRepository';
import {
  capitalizeFirstLetter,
  capitalizeWords,
} from '@app/src/Shared/Infrastructure/Utils/String';

import UpdatePromotionInputData from '../../Dtos/Promotions/UpdatePromotionInputData';

export default class UpdatePromotionAction {
  async execute(input: UpdatePromotionInputData) {
    const currentPromotion = await this.getCurrentPromotion(input.id);
    const categoryId =
      input.promotion_category_id ?? currentPromotion.promotion_category_id;
    const category = await this.getCategory(categoryId);
    const products = this.prepareProducts(input);
    const promotion = new Promotion(
      capitalizeWords(input.name) ?? currentPromotion.name,
      capitalizeFirstLetter(input.description) ?? currentPromotion.description,
      category,
      products,
      input.discount_amount ?? currentPromotion.discount_amount,
      input.discount_type ?? currentPromotion.discount_type,
      input.initial_date ?? currentPromotion.initial_date,
      input.final_date ?? currentPromotion.final_date,
      input.status ?? currentPromotion.status,
      currentPromotion.id,
    );
    const promotionRepository = new PromotionsRepository();
    await promotionRepository.save(promotion);
  }

  private async getCurrentPromotion(id: number) {
    const promotionsRepository = new PromotionsRepository();
    return await promotionsRepository.getPromotion(id);
  }
  private async getCategory(id: number) {
    const categoryModel = new PromotionsCategoriesModel();
    const category = await categoryModel.getCategoryById(id);
    return new PromotionCategory(category.name, id);
  }

  private prepareProducts(input: UpdatePromotionInputData) {
    if (!input.promotion_products) {
      return undefined;
    }
    return input.promotion_products.map(
      product => new PromotionProduct(product.id),
    );
  }
}
