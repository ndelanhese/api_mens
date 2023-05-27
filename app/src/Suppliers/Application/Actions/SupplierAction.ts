import BrasilApiService from '@app/src/Extras/Infrastructure/Services/BrasilApiService';
import HttpError from '@app/src/Shared/Domain/Exceptions/HttpError';

export default class SupplierAction {
  protected async validateCep(cep?: string) {
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
