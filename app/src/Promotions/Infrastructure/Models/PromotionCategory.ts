import categoriesModel from '@db-models/PromotionsCategoriesModel';
import HttpError from '@exceptions/HttpError';

import PromotionCategory from '../../Domain/Entities/PromotionCategory';

export default class PromotionsCategoriesModel {
  public async createPromotionCategory(payload: PromotionCategory) {
    try {
      return await categoriesModel.create({
        name: payload.getName(),
      });
    } catch (error) {
      throw new HttpError(
        500,
        'Erro ao cadastrar categoria de promoção.',
        error,
      );
    }
  }

  public async updatePromotionCategory(
    payload: PromotionCategory,
  ): Promise<void> {
    try {
      await categoriesModel.update(
        {
          name: payload.getName(),
        },
        {
          where: { id: payload.getId() },
        },
      );
    } catch (error) {
      throw new HttpError(
        500,
        'Erro ao atualizar categoria de promoção.',
        error,
      );
    }
  }

  public async deletePromotionCategory(categoryId: number): Promise<number> {
    try {
      const deleted = await categoriesModel.destroy({
        where: { id: categoryId },
      });
      if (deleted === 0) throw new HttpError(404, 'Categoria não encontrada.');
      return deleted;
    } catch (error) {
      if (error instanceof HttpError)
        throw new HttpError(error.statusCode, error.message, error);

      throw new HttpError(500, 'Erro ao excluir categoria de promoção.', error);
    }
  }

  public async getCategoryById(categoryId: number) {
    try {
      const category = await categoriesModel.findByPk(categoryId);
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
