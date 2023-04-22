import CategoriesRepository from '../../Infrastructure/Repositories/CategoriesRepository';
import DeleteCategoryInputData from '../Dtos/DeleteCategoryInputData';

export default class DeleteCategoryAction {
  async execute(input: DeleteCategoryInputData): Promise<void> {
    const brandRepository = new CategoriesRepository();
    await brandRepository.delete(input.id);
  }
}
