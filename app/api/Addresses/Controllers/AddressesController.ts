import CreateAddressAction from '@app/src/Addresses/Application/Actions/CreateAddressAction';
import DeleteAddressAction from '@app/src/Addresses/Application/Actions/DeleteAddressAction';
import UpdateAddressAction from '@app/src/Addresses/Application/Actions/UpdateAddressAction';
import { formatPostaCode } from '@app/src/Shared/Infrastructure/Utils/Formatter';
import BaseController from '@base-controller/BaseController';
import HttpError from '@exceptions/HttpError';
import { Request, Response } from 'express';

import CreateAddressFactory from '../Factories/CreateAddressFactory';
import DeleteAddressFactory from '../Factories/DeleteAddressFactory';
import UpdateAddressFactory from '../Factories/UpdateAddressFactory';
import AddressesModel from '../Models/AddressesModel';

import { Address } from './AddressController.types';

export default class AddressesController extends BaseController {
  public async getAddresses(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'addresses_read');
      const cacheKey = 'addresses';
      const cache = await this.getCache(cacheKey);
      if (cache) return res.status(200).json(cache);
      const addressesModel = new AddressesModel();
      const addresses = await addressesModel.getAddresses();
      const preparedAddresses = this.prepareAddressesResponse(addresses);
      const addressesResponse = this.returnInData(preparedAddresses);
      await this.createCache(cacheKey, addressesResponse);
      return res.status(200).json(addressesResponse);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async getAddress(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'addresses_read');
      const { id } = req.params;
      const cacheKey = `addresses-${id}`;
      const cache = await this.getCache(cacheKey);
      if (cache) return res.status(200).json(cache);
      const addressesModel = new AddressesModel();
      const address = await addressesModel.getAddress(Number(id));
      const preparedAddress = this.prepareAddressResponse(address);
      await this.createCache(cacheKey, preparedAddress);
      return res.status(200).json(preparedAddress);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async createAddress(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'addresses_create');
      const brandInputData = CreateAddressFactory.fromRequest(req);
      const brandAction = new CreateAddressAction();
      const brandId = (await brandAction.execute(brandInputData)).getId();
      await this.deleteCache('addresses');
      return res.status(201).json(brandId);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async updateAddress(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'addresses_update');
      const userInputData = UpdateAddressFactory.fromRequest(req);
      const userAction = new UpdateAddressAction();
      const addressesModel = new AddressesModel();
      const currentAddresses = await addressesModel.getAddress(
        userInputData.id,
      );
      const currentAddressesInputData =
        UpdateAddressFactory.fromCurrentAddress(currentAddresses);
      await userAction.execute(userInputData, currentAddressesInputData);
      await this.deleteCache('addresses');
      return res.status(204).send();
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async deleteAddress(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'addresses_delete');
      const userInputData = DeleteAddressFactory.fromRequest(req);
      const userAction = new DeleteAddressAction();
      await userAction.execute(userInputData);
      await this.deleteCache('addresses');
      return res.status(204).send();
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  private prepareAddressResponse(address: Address) {
    return {
      id: address.id,
      address: address.address,
      number: address.number,
      district: address.district,
      postal_code: formatPostaCode(address.postal_code),
      city: address.city,
      state: address.state,
    };
  }

  private prepareAddressesResponse(addresses: Address[]) {
    return addresses.map(address => ({
      id: address.id,
      address: address.address,
      number: address.number,
      district: address.district,
      postal_code: formatPostaCode(address.postal_code),
      city: address.city,
      state: address.state,
    }));
  }
}
