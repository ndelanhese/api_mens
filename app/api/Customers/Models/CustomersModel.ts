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
}
