import customersModel from '@db-models/CustomersModel';
import HttpError from '@exceptions/HttpError';

export default class ListCustomersModel {
  public async findAll() {
    try {
      return await customersModel.findAll();
    } catch (error) {
      throw new HttpError(500, 'Erro ao listar clientes.', error);
    }
  }
}
