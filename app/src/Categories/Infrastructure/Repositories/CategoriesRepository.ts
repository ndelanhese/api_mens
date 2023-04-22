import Category from '../../Domain/Entities/Category';
import CategoriesModel from '../Models/CategoriesModel';

export default class CategoriesRepository {
  private categoriesModel: CategoriesModel;

  constructor() {
    this.categoriesModel = new CategoriesModel();
  }

  async save(brand: Category): Promise<Category> {
    if (brand.getId()) {
      this.update(brand);
    }
    return this.create(brand);
  }

  async create(brand: Category): Promise<Category> {
    const { id } = await this.categoriesModel.createCategory(brand);
    return brand.setId(id);
  }

  async delete(brandId: number): Promise<void> {
    await this.categoriesModel.deleteCategory(brandId);
  }

  async update(brand: Category): Promise<void> {
    await this.categoriesModel.updateCategory(brand);
  }
}
