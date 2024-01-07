import promotionsModel from '@db-models/PromotionsModel';
import HttpError from '@exceptions/NotFountHttpError';
import { Op } from 'sequelize';

export class PromotionsModel {
  public async getPromotion(id: number) {
    try {
      const currentDate = new Date();
      return await promotionsModel.findOne({
        where: {
          id,
          status: {
            [Op.eq]: 'started',
          },
          initial_date: {
            [Op.lte]: currentDate,
          },
          final_date: {
            [Op.gte]: currentDate,
          },
        },
        attributes: ['discount_amount', 'discount_type'],
      });
    } catch (error) {
      throw new HttpError(error);
    }
  }
}
