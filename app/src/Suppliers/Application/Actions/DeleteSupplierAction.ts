import SupplierRepository from '../../Infrastructure/Repositories/SuppliersRepository';
import DeleteSupplierInputData from '../Dtos/DeleteSupplierInputData';

export default class DeleteSupplierAction {
  async execute(input: DeleteSupplierInputData): Promise<void> {
    const supplierRepository = new SupplierRepository();
    await supplierRepository.delete(input.id);
  }
}
