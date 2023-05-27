import Address from '../../Domain/Entities/Address';
import AddressesRepository from '../../Infrastructure/Repositories/AddressesRepository';
import CreateAddressInputData from '../Dtos/CreateAddressInputData';

export default class CreateAddressAction {
  async execute(input: CreateAddressInputData): Promise<Address> {
    const addressRepository = new AddressesRepository();
    const address = new Address(
      input.address,
      input.number,
      input.district,
      input.postal_code,
      input.city,
      input.state,
    );
    return await addressRepository.save(address);
  }
}
