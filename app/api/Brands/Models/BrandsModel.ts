import brandsModel from '@db-models/BrandsModel';
import HttpError from '@exceptions/HttpError';

export default class BrandsModel {
  public async getBrands() {
    try {
      return await brandsModel.findAll();
    } catch (error) {
      throw new HttpError(500, 'Erro ao buscar marcas.', error);
    }
  }

  public async getBrand(brand_id: number) {
    try {
      const brand = await brandsModel.findByPk(brand_id);
      if (!brand) throw new HttpError(404, 'Marca não encontrada.');
      return brand;
    } catch (error) {
      if (error instanceof HttpError)
        throw new HttpError(error.statusCode, error.message, error);
      throw new HttpError(500, 'Erro ao buscar marca.', error);
    }
  }
}
