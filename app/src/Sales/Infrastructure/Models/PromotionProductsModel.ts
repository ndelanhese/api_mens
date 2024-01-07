import PromotionsProductsModel from '@db-models/PromotionsProductsModel';
import HttpError from '@exceptions/HttpError';

export class PromotionProductsModel {
  public async getPromotionsByProduct(productId: number) {
    try {
      return await PromotionsProductsModel.findAll({
        where: {
          product_id: productId,
        },
        attributes: ['promotion_id'],
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao buscar promoções.', error);
    }
  }
}
