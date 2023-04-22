import categoriesModel from '@db-models/CategoriesModel';
import HttpError from '@exceptions/HttpError';

import Category from '../../Domain/Entities/Category';

export default class CategoriesModel {
  public async createCategory(payload: Category) {
    try {
      return await categoriesModel.create({
        name: payload.getName(),
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao cadastrar categoria.', error);
    }
  }

  public async updateCategory(payload: Category): Promise<void> {
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
      throw new HttpError(500, 'Erro ao atualizar categoria.', error);
    }
  }

  public async deleteCategory(categoryId: number): Promise<number> {
    try {
      const deleted = await categoriesModel.destroy({
        where: { id: categoryId },
      });
      if (deleted === 0) throw new HttpError(404, 'Categoria não encontrada.');
      return deleted;
    } catch (error) {
      if (error instanceof HttpError)
        throw new HttpError(error.statusCode, error.message, error);

      throw new HttpError(500, 'Erro ao excluir categoria.', error);
    }
  }
}
