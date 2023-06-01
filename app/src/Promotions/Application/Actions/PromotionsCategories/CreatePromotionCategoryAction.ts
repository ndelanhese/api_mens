import PromotionCategory from '../../../Domain/Entities/PromotionCategory';
import CategoriesRepository from '../../../Infrastructure/Repositories/PromotionsCategoriesRepository';
import CreatePromotionCategoryInputData from '../../Dtos/PromotionsCategories/CreatePromotionCategoryInputData';

export default class CreatePromotionCategoryAction {
  async execute(
    input: CreatePromotionCategoryInputData,
  ): Promise<PromotionCategory> {
    const categoriesRepository = new CategoriesRepository();
    const category = new PromotionCategory(input.name);
    return await categoriesRepository.save(category);
  }
}
