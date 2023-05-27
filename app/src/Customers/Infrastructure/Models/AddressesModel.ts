import addressesModel from '@db-models/AddressesModel';
import HttpError from '@exceptions/HttpError';

import Address from '../../Domain/Entities/Address';

export default class AddressesModel {
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
}
