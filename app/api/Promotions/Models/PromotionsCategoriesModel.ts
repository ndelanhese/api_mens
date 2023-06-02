import categoriesModel from '@db-models/PromotionsCategoriesModel';
import HttpError from '@exceptions/HttpError';

export default class PromotionCategoriesModel {
  public async getPromotionCategories() {
    try {
      return await categoriesModel.findAll();
    } catch (error) {
      throw new HttpError(500, 'Erro ao buscar categorias de promoção.', error);
    }
  }

  public async getPromotionCategory(category_id: number) {
    try {
      const category = await categoriesModel.findByPk(category_id);
      if (!category)
        throw new HttpError(404, 'Categoria de promoção não encontrada.');
      return category;
    } catch (error) {
      if (error instanceof HttpError)
        throw new HttpError(error.statusCode, error.message, error);
      throw new HttpError(500, 'Erro ao buscar categoria de promoção.', error);
    }
  }
}
