import Address from '../../Domain/Entities/Address';
import AddressesRepository from '../../Infrastructure/Repositories/AddressesRepository';
import UpdateAddressInputData from '../Dtos/UpdateAddressInputData';

export default class UpdateAddressAction {
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
    );
    await addressesRepository.update(address);
  }
}
