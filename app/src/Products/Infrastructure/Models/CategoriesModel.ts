import categoriesModel from '@db-models/CategoriesModel';
import HttpError from '@exceptions/HttpError';

export default class CategoriesModel {
  public async getCategory(brand_id: number) {
    try {
      const brand = await categoriesModel.findByPk(brand_id);
      if (!brand) throw new HttpError(404, 'Categoria não encontrada.');
      return brand;
    } catch (error) {
      if (error instanceof HttpError)
        throw new HttpError(error.statusCode, error.message, error);
      throw new HttpError(500, 'Erro ao buscar categoria.', error);
    }
  }
}
