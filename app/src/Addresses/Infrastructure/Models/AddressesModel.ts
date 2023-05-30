import addressesModel from '@db-models/AddressesModel';
import HttpError from '@exceptions/HttpError';

import Address from '../../Domain/Entities/Address';

export default class AddressesModel {
  public async createAddress(payload: Address) {
    try {
      return await addressesModel.create({
        address: payload.getAddress(),
        number: payload.getNumber(),
        district: payload.getDistrict(),
        postal_code: payload.getPostalCode(),
        city: payload.getCity(),
        state: payload.getState(),
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao cadastrar endereço.', error);
    }
  }

  public async updateAddress(payload: Address): Promise<void> {
    try {
      await addressesModel.update(
        {
          address: payload.getAddress(),
          number: payload.getNumber(),
          district: payload.getDistrict(),
          postal_code: payload.getPostalCode(),
          city: payload.getCity(),
          state: payload.getState(),
        },
        {
          where: { id: payload.getId() },
        },
      );
    } catch (error) {
      throw new HttpError(500, 'Erro ao atualizar endereço.', error);
    }
  }

  public async deleteAddress(id: number): Promise<number> {
    try {
      const deleted = await addressesModel.destroy({ where: { id } });
      if (deleted === 0) throw new HttpError(404, 'Endereço não encontrada.');
      return deleted;
    } catch (error) {
      if (error instanceof HttpError)
        throw new HttpError(error.statusCode, error.message, error);

      throw new HttpError(500, 'Erro ao excluir endereço.', error);
    }
  }
}
