import suppliersModel from '@db-models/SuppliersModel';
import HttpError from '@exceptions/HttpError';

export default class SuppliersModel {
  public async getSupplier(supplierId: number) {
    try {
      const supplier = await suppliersModel.findByPk(supplierId);
      if (!supplier) throw new HttpError(404, 'Fornecedor não encontrado.');
      return supplier;
    } catch (error) {
      if (error instanceof HttpError)
        throw new HttpError(error.statusCode, error.message, error);
      throw new HttpError(500, 'Erro ao listar funcionário.', error);
    }
  }
}
