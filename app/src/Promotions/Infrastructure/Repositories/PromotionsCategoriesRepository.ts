import PromotionsCategory from '../../Domain/Entities/PromotionCategory';
import PromotionsCategoriesModel from '../Models/PromotionCategory';

export default class PromotionsCategoriesRepository {
  private categoriesModel: PromotionsCategoriesModel;

  constructor() {
    this.categoriesModel = new PromotionsCategoriesModel();
  }

  async save(brand: PromotionsCategory): Promise<PromotionsCategory> {
    if (brand.getId()) {
      this.update(brand);
    }
    return this.create(brand);
  }

  async create(brand: PromotionsCategory): Promise<PromotionsCategory> {
    const { id } = await this.categoriesModel.createPromotionCategory(brand);
    return brand.setId(id);
  }

  async delete(brandId: number): Promise<void> {
    await this.categoriesModel.deletePromotionCategory(brandId);
  }

  async update(brand: PromotionsCategory): Promise<void> {
    await this.categoriesModel.updatePromotionCategory(brand);
  }
}
