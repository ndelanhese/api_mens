import brandsModel from '@db-models/BrandsModel';
import HttpError from '@exceptions/HttpError';

import Brand from '../../Domain/Entities/Brand';

export default class BrandsModel {
  public async createBrand(payload: Brand) {
    try {
      return await brandsModel.create({
        name: payload.getName(),
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao cadastrar marca.', error);
    }
  }

  public async updateBrand(payload: Brand): Promise<void> {
    try {
      await brandsModel.update(
        {
          name: payload.getName(),
        },
        {
          where: { id: payload.getId() },
        },
      );
    } catch (error) {
      throw new HttpError(500, 'Erro ao atualizar marca.', error);
    }
  }

  public async deleteBrand(userId: number): Promise<number> {
    try {
      const deleted = await brandsModel.destroy({ where: { id: userId } });
      if (deleted === 0) throw new HttpError(404, 'Marca não encontrada.');
      return deleted;
    } catch (error) {
      if (error instanceof HttpError)
        throw new HttpError(error.statusCode, error.message, error);

      throw new HttpError(500, 'Erro ao excluir marca.', error);
    }
  }
}
