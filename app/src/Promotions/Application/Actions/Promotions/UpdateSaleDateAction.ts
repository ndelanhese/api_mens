import PromotionsRepository from '@app/src/Promotions/Infrastructure/Repositories/PromotionsRepository';

import UpdatePromotionDateInputData from '../../Dtos/Promotions/UpdatePromotionStatusInputData';

export default class UpdatePromotionDateAction {
  async execute(input: UpdatePromotionDateInputData) {
    const { id, start_date, final_date } = input;
    const promotionsRepository = new PromotionsRepository();
    await promotionsRepository.updatePromotionDate(id, start_date, final_date);
  }
}
