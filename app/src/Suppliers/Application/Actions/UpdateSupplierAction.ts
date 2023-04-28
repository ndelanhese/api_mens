import Supplier from '../../Domain/Entities/Supplier';
import SuppliersRepository from '../../Infrastructure/Repositories/SuppliersRepository';
import UpdateSupplierInputData from '../Dtos/UpdateSupplierInputData';

export default class UpdateSupplierAction {
  async execute(
    input: UpdateSupplierInputData,
    currentValue: Supplier,
  ): Promise<void> {
    const supplierRepository = new SuppliersRepository();
    const supplier = new Supplier(
      input.contact_name || currentValue.getContactName(),
      input.corporate_name || currentValue.getCorporateName(),
      input.cnpj || currentValue.getCnpj(),
      input.status || currentValue.getStatus(),
      undefined,
      input.id || currentValue.getId(),
    );
    await supplierRepository.update(supplier);
  }
}
