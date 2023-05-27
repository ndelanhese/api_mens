import AddressesRepository from '../../Infrastructure/Repositories/AddressesRepository';
import DeleteAddressInputData from '../Dtos/DeleteAddressInputData';

export default class DeleteAddressAction {
  async execute(input: DeleteAddressInputData): Promise<void> {
    const addressRepository = new AddressesRepository();
    await addressRepository.delete(input.id);
  }
}
