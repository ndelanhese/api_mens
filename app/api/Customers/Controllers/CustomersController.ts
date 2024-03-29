import ListFactory from '@app/api/Shared/Factories/ListFactory';
import CreateCustomerAction from '@app/src/Customers/Application/Actions/CreateCustomerAction';
import DeleteCustomerAction from '@app/src/Customers/Application/Actions/DeleteCustomerAction';
import UpdateCustomerAction from '@app/src/Customers/Application/Actions/UpdateCustomerAction';
import { CustomerStatusTypes } from '@app/src/Customers/Domain/Enums/CustomerStatusTypes';
import { formatCpf } from '@app/src/Shared/Infrastructure/Utils/CpfCnpjFormatter';
import { formatLocaleDateString } from '@app/src/Shared/Infrastructure/Utils/Date';
import {
  formatPhoneNumber,
  formatPostaCode,
  formatRG,
} from '@app/src/Shared/Infrastructure/Utils/Formatter';
import BaseController from '@base-controller/BaseController';
import HttpError from '@exceptions/HttpError';
import { Request, Response } from 'express';

import CreateCustomerFactory from '../Factories/CreateCustomerFactory';
import DeleteCustomerFactory from '../Factories/DeleteCustomerFactory';
import UpdateCustomerFactory from '../Factories/UpdateCustomerFactory';
import CustomersModel from '../Models/CustomersModel';

import {
  IAddress,
  ICustomer,
  ICustomerAddressData,
} from './CustomersController.types';

export default class CustomersController extends BaseController {
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
      const cacheKey = `customers-${JSON.stringify(req.query)}`;
      const cache = await this.getCache(cacheKey);
      if (cache) return res.status(200).json(cache);
      const { status } = ListFactory.fromRequest(req);
      const customers = await this.customersModel.getCustomers(status);
      const customerWithAddresses = customers.map(customer => {
        const addresses = this.prepareCustomerAddresses(customer.addresses);
        return this.prepareCustomerWithAddresses(customer, addresses);
      });
      const data = this.returnInData(customerWithAddresses);
      await this.createCache(cacheKey, data);
      return res.status(200).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async getCustomer(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'customers_read');
      const { id } = req.params;
      const cacheKey = `customers-${id}`;
      const cache = await this.getCache(cacheKey);
      if (cache) return res.status(200).json(cache);
      const customer = await this.customersModel.getCustomer(Number(id));
      const addresses = this.prepareCustomerAddresses(customer.addresses);
      const customerWithAddresses = this.prepareCustomerWithAddresses(
        customer,
        addresses,
      );
      await this.createCache(cacheKey, customerWithAddresses);
      return res.status(200).json(customerWithAddresses);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async createCustomer(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'customers_create');
      const customerInputData = CreateCustomerFactory.fromRequest(req);
      const customerAction = new CreateCustomerAction();
      const customerId = (
        await customerAction.execute(customerInputData)
      ).getId();
      await this.deleteCache('customers');
      return res.status(201).json(customerId);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async updateCustomer(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'customers_update');
      const customerInputData = UpdateCustomerFactory.fromRequest(req);
      const customerAction = new UpdateCustomerAction();
      const currentCustomer = await this.customersModel.getCustomer(
        customerInputData.id,
      );
      if (!currentCustomer) throw new HttpError(404, 'Cliente não encontrado.');
      const currentCustomerInputData =
        UpdateCustomerFactory.fromCurrentCustomer(currentCustomer);
      await customerAction.execute(customerInputData, currentCustomerInputData);
      await this.deleteCache('customers');
      return res.status(204).send();
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async deleteCustomer(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'customers_delete');
      const customerInputData = DeleteCustomerFactory.fromRequest(req);
      const customerAction = new DeleteCustomerAction();
      await customerAction.execute(customerInputData);
      await this.deleteCache('customers');
      return res.status(204).send();
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async getStatus(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'customers_read');
      const cache = await this.getCache('customers-status');
      if (cache) return res.status(200).json(cache);
      const status = CustomerStatusTypes.labelsToKeyValue();
      await this.createCache('customers-status', status);
      return res.status(200).json(status);
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
      cpf: formatCpf(customer.cpf),
      rg: formatRG(customer.rg ?? ''),
      birth_date: formatLocaleDateString(customer.birth_date),
      phone: formatPhoneNumber(customer.phone),
      status: CustomerStatusTypes.getLabel(customer.status),
      addresses: addresses.map(address => ({
        id: address.id,
        address: address.address,
        number: address.number,
        district: address.district,
        postal_code: formatPostaCode(address.postal_code),
        city: address.city,
        state: address.state,
      })),
    };
  }
}
