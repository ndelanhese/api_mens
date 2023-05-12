import customersModel from '@db-models/CustomersModel';
import HttpError from '@exceptions/HttpError';

export default class ListCustomersModel {
  public async getCustomer(customerId: number) {
    try {
      const customer = await customersModel.findByPk(customerId);
      if (!customer) throw new HttpError(404, 'Cliente não encontrado.');
      return customer;
    } catch (error) {
      if (error instanceof HttpError)
        throw new HttpError(error.statusCode, error.message, error);
      throw new HttpError(500, 'Erro ao listar cliente.', error);
    }
  }
}
