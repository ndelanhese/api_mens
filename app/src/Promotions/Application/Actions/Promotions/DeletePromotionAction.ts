import PromotionRepository from '../../../Infrastructure/Repositories/PromotionsRepository';
import DeletePromotionInputData from '../../Dtos/Promotions/DeletePromotionInputData';

export default class DeletePromotionAction {
  async execute(input: DeletePromotionInputData): Promise<void> {
    const promotionRepository = new PromotionRepository();
    await promotionRepository.delete(input.id);
  }
}
