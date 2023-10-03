import { capitalizeWords } from '@app/src/Shared/Infrastructure/Utils/String';

import Address from '../../Domain/Entities/Address';
import Supplier from '../../Domain/Entities/Supplier';
import AddressesModel from '../../Infrastructure/Models/AddressesModel';
import SuppliersRepository from '../../Infrastructure/Repositories/SuppliersRepository';
import UpdateSupplierInputData from '../Dtos/UpdateSupplierInputData';

import SupplierAction from './SupplierAction';

export default class UpdateSupplierAction extends SupplierAction {
  async execute(
    input: UpdateSupplierInputData,
    currentValue: Supplier,
  ): Promise<void> {
    const supplierRepository = new SuppliersRepository();
    const supplier = new Supplier(
      capitalizeWords(input.contact_name) || currentValue.getContactName(),
      capitalizeWords(input.corporate_name) || currentValue.getCorporateName(),
      input.cnpj || currentValue.getCnpj(),
      input.status || currentValue.getStatus(),
      undefined,
      input.id || currentValue.getId(),
    );
    await supplierRepository.update(supplier);
    await this.updateAddress(input);
  }

  private async updateAddress(input: UpdateSupplierInputData) {
    if (input.address) {
      const { address: inputData } = input;
      await this.validateCep(inputData.postal_code);
      const address = new Address(
        capitalizeWords(inputData.address),
        inputData.number,
        capitalizeWords(inputData.district),
        inputData.postal_code,
        capitalizeWords(inputData.city),
        capitalizeWords(inputData.state),
        inputData.id,
      );
      const addressesModel = new AddressesModel();
      await addressesModel.updateAddress(address);
      return;
    }
    return;
  }
}
