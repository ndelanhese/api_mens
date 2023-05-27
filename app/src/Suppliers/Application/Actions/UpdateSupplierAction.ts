import BrasilApiService from '@app/src/Extras/Infrastructure/Services/BrasilApiService';
import HttpError from '@app/src/Shared/Domain/Exceptions/HttpError';

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
    await this.validateCep(supplier.getAddress()?.getPostalCode());
    await supplierRepository.update(supplier);
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
