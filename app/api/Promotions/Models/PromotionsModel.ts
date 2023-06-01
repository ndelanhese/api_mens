import PromotionsCategoriesModel from '@app/database/Models/PromotionsCategoriesModel';
import salesModel from '@db-models/PromotionsModel';
import HttpError from '@exceptions/HttpError';

//TODO -> Adicionar filtro por status
export default class PromotionsModel {
  public async getPromotions() {
    try {
      return await salesModel.findAll({
        order: [['id', 'DESC']],
        include: [
          {
            model: PromotionsCategoriesModel,
            as: 'category',
          },
        ],
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao listar promoções.', error);
    }
  }

  public async getPromotion(id: number) {
    try {
      const sale = await salesModel.findByPk(id, {
        include: [
          {
            model: PromotionsCategoriesModel,
            as: 'category',
          },
        ],
      });
      if (!sale) throw new HttpError(404, 'Promoção não encontrada.');
      return sale;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, 'Erro ao buscar promoção.', error);
    }
  }
}
