import Supplier from '../../Domain/Entities/Supplier';
import SuppliersModel from '../Models/SuppliersModel';

export default class SupplierRepository {
  private supplierModel: SuppliersModel;

  constructor() {
    this.supplierModel = new SuppliersModel();
  }

  async save(supplier: Supplier): Promise<Supplier> {
    if (supplier.getId()) {
      this.update(supplier);
    }
    return this.create(supplier);
  }

  async create(supplier: Supplier): Promise<Supplier> {
    const { id } = await this.supplierModel.createSupplier(supplier);
    return supplier.setId(id);
  }

  async delete(supplierId: number): Promise<void> {
    await this.supplierModel.deleteSupplier(supplierId);
  }

  async update(supplier: Supplier): Promise<void> {
    await this.supplierModel.updateSupplier(supplier);
  }
}
