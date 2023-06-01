import PromotionsCategoriesRepository from '@app/src/Promotions/Infrastructure/Repositories/PromotionsCategoriesRepository';

import DeletePromotionCategoryInputData from '../../Dtos/PromotionsCategories/DeletePromotionCategoryInputData';

export default class DeletePromotionCategoryAction {
  async execute(input: DeletePromotionCategoryInputData): Promise<void> {
    const brandRepository = new PromotionsCategoriesRepository();
    await brandRepository.delete(input.id);
  }
}
