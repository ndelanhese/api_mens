import Address from '../../Domain/Entities/Address';
import AddressesModel from '../Models/AddressesModel';

export default class AddressesRepository {
  private addressesModel: AddressesModel;

  constructor() {
    this.addressesModel = new AddressesModel();
  }

  async save(brand: Address): Promise<Address> {
    if (brand.getId()) {
      this.update(brand);
    }
    return this.create(brand);
  }

  async create(brand: Address): Promise<Address> {
    const { id } = await this.addressesModel.createAddress(brand);
    return brand.setId(id);
  }

  async delete(brandId: number): Promise<void> {
    await this.addressesModel.deleteAddress(brandId);
  }

  async update(brand: Address): Promise<void> {
    await this.addressesModel.updateAddress(brand);
  }
}
