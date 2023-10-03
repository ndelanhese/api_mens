import { capitalizeFirstLetter } from '@app/src/Shared/Infrastructure/Utils/String';

import Category from '../../Domain/Entities/Category';
import CategoriesRepository from '../../Infrastructure/Repositories/CategoriesRepository';
import UpdateCategoryInputData from '../Dtos/UpdateCategoryInputData';

export default class UpdateCategoryAction {
  async execute(
    input: UpdateCategoryInputData,
    currentValue: Category,
  ): Promise<void> {
    const categoriesRepository = new CategoriesRepository();
    const category = new Category(
      capitalizeFirstLetter(input.name) || currentValue.getName(),
      input.id || currentValue.getId(),
    );
    await categoriesRepository.update(category);
  }
}
