import PaginationFactory from '@app/api/Shared/Factories/PaginationFactory';
import { formatCnpj } from '@app/src/Shared/Infrastructure/Utils/CpfCnpjFormatter';
import CreateSupplierAction from '@app/src/Suppliers/Application/Actions/CreateSupplierAction';
import DeleteSupplierAction from '@app/src/Suppliers/Application/Actions/DeleteSupplierAction';
import UpdateSupplierAction from '@app/src/Suppliers/Application/Actions/UpdateSupplierAction';
import BaseController from '@base-controller/BaseController';
import HttpError from '@exceptions/HttpError';
import { Request, Response } from 'express';

import CreateSupplierFactory from '../Factories/CreateSupplierFactory';
import DeleteSupplierFactory from '../Factories/DeleteSupplierFactory';
import UpdateSupplierFactory from '../Factories/UpdateSupplierFactory';
import SuppliersModel from '../Models/SuppliersModel';

import {
  IAddress,
  ISupplier,
  ISupplierAddressData,
} from './SuppliersController.types';

export default class SuppliersController extends BaseController {
  private suppliersModel: SuppliersModel;

  constructor() {
    super();
    this.suppliersModel = new SuppliersModel();
  }

  public async getSuppliers(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'suppliers_read');
      const cache = await this.getCache('suppliers');
      if (cache) return res.status(200).json(cache);
      const { page, perPage, order, direction } =
        PaginationFactory.fromRequest(req);
      const suppliers = await this.suppliersModel.getSuppliers(
        order,
        direction,
      );
      const supplierWithAddresses = suppliers.map(supplier => {
        const addresses = this.prepareSupplierAddresses(
          supplier.supplier_addresses,
        );
        return this.prepareSupplierWithAddresses(supplier, addresses);
      });
      const data = this.dataPagination(page, perPage, supplierWithAddresses);
      await this.createCache('suppliers', data);
      return res.status(200).json(data);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async getSupplier(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'suppliers_read');
      const { id } = req.params;
      const cacheKey = `suppliers-${id}`;
      const cache = await this.getCache(cacheKey);
      if (cache) return res.status(200).json(cache);
      const supplier = await this.suppliersModel.getSupplier(Number(id));
      const addresses = this.prepareSupplierAddresses(
        supplier.supplier_addresses,
      );
      const supplierWithAddresses = this.prepareSupplierWithAddresses(
        supplier,
        addresses,
      );
      await this.createCache(cacheKey, supplierWithAddresses);
      return res.status(200).json(supplierWithAddresses);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async createSupplier(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      // await this.verifyPermission(req, 'suppliers_create');
      const supplierInputData = CreateSupplierFactory.fromRequest(req);
      const supplierAction = new CreateSupplierAction();
      const supplierId = (
        await supplierAction.execute(supplierInputData)
      ).getId();
      await this.deleteCache('suppliers');
      return res.status(201).json(supplierId);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async updateSupplier(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'suppliers_update');
      const supplierInputData = UpdateSupplierFactory.fromRequest(req);
      const supplierAction = new UpdateSupplierAction();
      const currentSupplier = await this.suppliersModel.getSupplier(
        supplierInputData.id,
      );
      if (!currentSupplier)
        throw new HttpError(404, 'Fornecedor não encontrado.');
      const currentSupplierInputData =
        UpdateSupplierFactory.fromCurrentSupplier(currentSupplier);
      await supplierAction.execute(supplierInputData, currentSupplierInputData);
      await this.deleteCache('suppliers');
      return res.status(204).send();
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async deleteSupplier(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'suppliers_delete');
      const supplierInputData = DeleteSupplierFactory.fromRequest(req);
      const supplierAction = new DeleteSupplierAction();
      await supplierAction.execute(supplierInputData);
      await this.deleteCache('suppliers');
      return res.status(204).send();
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  private prepareSupplierAddresses(addresses: ISupplierAddressData[]) {
    return addresses.map(address => address.address);
  }

  private prepareSupplierWithAddresses(
    supplier: ISupplier,
    addresses: IAddress[],
  ) {
    return {
      id: supplier.id,
      contact_name: supplier.contact_name,
      corporate_name: supplier.corporate_name,
      cnpj: formatCnpj(supplier.cnpj),
      status: supplier.status,
      addresses: addresses,
    };
  }
}
