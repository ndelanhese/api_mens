/* eslint-disable @typescript-eslint/no-explicit-any */
import AddressesModel from '@db-models/AddressesModel';
import CustomersAddressesModel from '@db-models/CustomersAddressesModel';
import customersModel from '@db-models/CustomersModel';
import HttpError from '@exceptions/HttpError';

import { ICustomer } from './ListCustomersModel.types';

export default class ListCustomersModel {
  public async getCustomers(): Promise<ICustomer[]> {
    try {
      const customers: any = await customersModel.findAll({
        include: [
          {
            model: CustomersAddressesModel,
            as: 'addresses',
            include: [
              {
                model: AddressesModel,
                as: 'address',
                attributes: [
                  'address',
                  'number',
                  'district',
                  'postal_code',
                  'city',
                  'state',
                ],
              },
            ],
          },
        ],
      });
      return customers;
    } catch (error) {
      throw new HttpError(500, 'Erro ao listar clientes.', error);
    }
  }

  public async getCustomer(customerId: number): Promise<ICustomer> {
    try {
      const customers: any = await customersModel.findByPk(customerId, {
        include: [
          {
            model: CustomersAddressesModel,
            as: 'addresses',
            include: [
              {
                model: AddressesModel,
                as: 'address',
                attributes: [
                  'address',
                  'number',
                  'district',
                  'postal_code',
                  'city',
                  'state',
                ],
              },
            ],
          },
        ],
      });
      if (!customers) throw new HttpError(404, 'Cliente não encontrado.');
      return customers;
    } catch (error) {
      if (error instanceof HttpError)
        throw new HttpError(error.statusCode, error.message, error);
      throw new HttpError(500, 'Erro ao listar cliente.', error);
    }
  }
}
