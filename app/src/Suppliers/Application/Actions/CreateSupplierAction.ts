import BrasilApiService from '@app/src/Extras/Infrastructure/Services/BrasilApiService';
import HttpError from '@app/src/Shared/Domain/Exceptions/HttpError';

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
    await this.validateCep(supplier.getAddress()?.getPostalCode());
    return await supplierRepository.save(supplier);
  }

  private async validateCep(cep?: string) {
    if (!cep) {
      throw new HttpError(404, 'CEP inválido');
    }
    const brasilApiService = new BrasilApiService();
    const hasCep = await brasilApiService.getAddressByCep(cep);
    if (!hasCep) {
      throw new HttpError(404, 'CEP inválido');
    }
    return;
  }
}
