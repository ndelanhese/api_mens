import Category from '../../Domain/Entities/Category';
import CategoriesModel from '../Models/CategoriesModel';

export default class CategoriesRepository {
  private categoriesModel: CategoriesModel;

  constructor() {
    this.categoriesModel = new CategoriesModel();
  }

  async save(category: Category): Promise<Category> {
    if (category.getId()) {
      this.update(category);
    }
    return this.create(category);
  }

  async create(category: Category): Promise<Category> {
    const { id } = await this.categoriesModel.createCategory(category);
    return category.setId(id);
  }

  async delete(categoryId: number): Promise<void> {
    await this.categoriesModel.deleteCategory(categoryId);
  }

  async update(category: Category): Promise<void> {
    await this.categoriesModel.updateCategory(category);
  }
}
