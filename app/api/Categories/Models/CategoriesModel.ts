import categoriesModel from '@db-models/CategoriesModel';
import HttpError from '@exceptions/HttpError';

export default class CategoriesModel {
  public async getCategories() {
    try {
      return await categoriesModel.findAll();
    } catch (error) {
      throw new HttpError(500, 'Erro ao buscar categorias.', error);
    }
  }

  public async getCategory(category_id: number) {
    try {
      const category = await categoriesModel.findByPk(category_id);
      if (!category) throw new HttpError(404, 'Categoria não encontrada.');
      return category;
    } catch (error) {
      if (error instanceof HttpError)
        throw new HttpError(error.statusCode, error.message, error);
      throw new HttpError(500, 'Erro ao buscar categoria.', error);
    }
  }
}
