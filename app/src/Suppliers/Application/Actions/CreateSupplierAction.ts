import Supplier from '../../Domain/Entities/Supplier';
import SupplierRepository from '../../Infrastructure/Repositories/SuppliersRepository';
import CreateSupplierInputData from '../Dtos/CreateSupplierInputData';

export default class CreateSupplierAction {
  async execute(input: CreateSupplierInputData): Promise<Supplier> {
    const supplierRepository = new SupplierRepository();
    const supplier = new Supplier(
      input.contact_name,
      input.corporate_name,
      input.cnpj,
      input.status,
      input.address,
    );
    return await supplierRepository.save(supplier);
  }
}
