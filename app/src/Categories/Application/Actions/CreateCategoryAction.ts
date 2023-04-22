import Category from '../../Domain/Entities/Category';
import CategoriesRepository from '../../Infrastructure/Repositories/CategoriesRepository';
import CreateCategoryInputData from '../Dtos/CreateCategoryInputData';

export default class CreateCategoryAction {
  async execute(input: CreateCategoryInputData): Promise<Category> {
    const brandRepository = new CategoriesRepository();
    const user = new Category(input.name);
    return await brandRepository.save(user);
  }
}
