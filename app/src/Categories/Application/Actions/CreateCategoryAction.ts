import Category from '../../Domain/Entities/Category';
import CategoriesRepository from '../../Infrastructure/Repositories/CategoriesRepository';
import CreateCategoryInputData from '../Dtos/CreateCategoryInputData';

export default class CreateCategoryAction {
  async execute(input: CreateCategoryInputData): Promise<Category> {
    const categoriesRepository = new CategoriesRepository();
    const category = new Category(input.name);
    return await categoriesRepository.save(category);
  }
}
