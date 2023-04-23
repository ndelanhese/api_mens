import BaseController from '@base-controller/BaseController';
import HttpError from '@exceptions/HttpError';
import { Request, Response } from 'express';

import CustomersModel from '../Models/CustomersModel';

import {
  IAddress,
  ICustomer,
  ICustomerAddressData,
} from './CustomersController.types';

export default class UsersController extends BaseController {
  private customersModel: CustomersModel;

  constructor() {
    super();
    this.customersModel = new CustomersModel();
  }

  public async getCustomers(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'customers_read');
      const cache = await this.getCache('customers');
      if (cache) return res.status(200).json(cache);
      const customers = await this.customersModel.getCustomers();
      const customerWithAddresses = customers.map(customer => {
        const addresses = this.prepareCustomerAddresses(customer.addresses);
        return this.prepareCustomerWithAddresses(customer, addresses);
      });
      await this.createCache('customers', customers);
      return res.status(200).json(customerWithAddresses);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  private prepareCustomerAddresses(addresses: ICustomerAddressData[]) {
    return addresses.map(address => address.address);
  }

  private prepareCustomerWithAddresses(
    customer: ICustomer,
    addresses: IAddress[],
  ) {
    return {
      id: customer.id,
      name: customer.name,
      cpf: customer.cpf,
      rg: customer.rg,
      birth_date: customer.birth_date,
      phone: customer.phone,
      status: customer.status,
      addresses: addresses,
    };
  }
}
