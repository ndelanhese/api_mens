import Address from '../../Domain/Entities/Address';
import AddressesRepository from '../../Infrastructure/Repositories/AddressesRepository';
import UpdateAddressInputData from '../Dtos/UpdateAddressInputData';

import AddressesAction from './AddressesAction';

export default class UpdateAddressAction extends AddressesAction {
  async execute(
    input: UpdateAddressInputData,
    currentValue: Address,
  ): Promise<void> {
    const addressesRepository = new AddressesRepository();
    const address = new Address(
      input.address || currentValue.getAddress(),
      input.number || currentValue.getNumber(),
      input.district || currentValue.getDistrict(),
      input.postal_code || currentValue.getPostalCode(),
      input.city || currentValue.getCity(),
      input.state || currentValue.getState(),
      currentValue.getId(),
    );
    await this.validateCep(address.getPostalCode());
    await addressesRepository.update(address);
  }
}
