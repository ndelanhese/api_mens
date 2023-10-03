import { capitalizeWords } from '@app/src/Shared/Infrastructure/Utils/String';

import Supplier from '../../Domain/Entities/Supplier';
import SupplierRepository from '../../Infrastructure/Repositories/SuppliersRepository';
import CreateSupplierInputData from '../Dtos/CreateSupplierInputData';

import SupplierAction from './SupplierAction';

export default class CreateSupplierAction extends SupplierAction {
  async execute(input: CreateSupplierInputData): Promise<Supplier> {
    const supplierRepository = new SupplierRepository();
    const supplier = new Supplier(
      capitalizeWords(input.contact_name),
      capitalizeWords(input.corporate_name),
      input.cnpj,
      input.status,
      input.address,
    );
    await this.validateCep(supplier.getAddress()?.getPostalCode());
    return await supplierRepository.save(supplier);
  }
}
