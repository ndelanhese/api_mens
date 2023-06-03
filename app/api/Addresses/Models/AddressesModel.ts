import addressesModel from '@db-models/AddressesModel';
import HttpError from '@exceptions/HttpError';

export default class AddressesModel {
  public async getAddresses() {
    try {
      return await addressesModel.findAll();
    } catch (error) {
      throw new HttpError(500, 'Erro ao buscar enderenços.', error);
    }
  }

  public async getAddress(id: number) {
    try {
      const brand = await addressesModel.findByPk(id);
      if (!brand) throw new HttpError(404, 'Endereço não encontrada.');
      return brand;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, 'Erro ao buscar enderenço.', error);
    }
  }
}
