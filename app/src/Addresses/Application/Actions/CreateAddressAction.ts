import Address from '../../Domain/Entities/Address';
import AddressesRepository from '../../Infrastructure/Repositories/AddressesRepository';
import CreateAddressInputData from '../Dtos/CreateAddressInputData';

import AddressesAction from './AddressesAction';

export default class CreateAddressAction extends AddressesAction {
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
    await this.validateCep(address.getPostalCode());
    return await addressRepository.save(address);
  }
}
