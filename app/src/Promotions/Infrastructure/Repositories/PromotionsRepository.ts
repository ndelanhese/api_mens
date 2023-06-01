import Promotion from '../../Domain/Entities/Promotion';
import PromotionsModel from '../Models/PromotionsModel';

export default class PromotionsRepository {
  private promotionsModel: PromotionsModel;

  constructor() {
    this.promotionsModel = new PromotionsModel();
  }

  async save(promotion: Promotion): Promise<Promotion> {
    if (promotion.getId()) {
      return this.update(promotion);
    }
    return this.create(promotion);
  }

  async create(promotion: Promotion): Promise<Promotion> {
    const { id } = await this.promotionsModel.createPromotion(promotion);
    return promotion.setId(id);
  }

  async delete(id: number): Promise<void> {
    await this.promotionsModel.deletePromotion(id);
  }

  async update(promotion: Promotion): Promise<Promotion> {
    await this.promotionsModel.updatePromotion(promotion);
    return promotion;
  }

  async updatePromotionDate(
    id: number,
    initial_date?: Date,
    final_date?: Date,
  ) {
    await this.promotionsModel.updatePromotionDate(
      id,
      initial_date,
      final_date,
    );
  }

  async getPromotion(id: number) {
    return await this.promotionsModel.getPromotion(id);
  }
}
