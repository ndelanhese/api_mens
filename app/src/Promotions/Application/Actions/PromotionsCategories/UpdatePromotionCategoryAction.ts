import PromotionCategory from '@app/src/Promotions/Domain/Entities/PromotionCategory';
import PromotionsCategoriesRepository from '@app/src/Promotions/Infrastructure/Repositories/PromotionsCategoriesRepository';

import UpdatePromotionCategoryInputData from '../../Dtos/PromotionsCategories/UpdatePromotionCategoryInputData';

export default class UpdatePromotionCategoryAction {
  async execute(
    input: UpdatePromotionCategoryInputData,
    currentValue: PromotionCategory,
  ): Promise<void> {
    const categoriesRepository = new PromotionsCategoriesRepository();
    const category = new PromotionCategory(
      input.name || currentValue.getName(),
      input.id || currentValue.getId(),
    );
    await categoriesRepository.update(category);
  }
}
