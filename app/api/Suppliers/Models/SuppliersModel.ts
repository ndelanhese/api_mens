/* eslint-disable @typescript-eslint/no-explicit-any */
import SuppliersAddressesModel from '@app/database/Models/SuppliersAddressesModel';
import AddressesModel from '@db-models/AddressesModel';
import suppliersModel from '@db-models/SuppliersModel';
import HttpError from '@exceptions/HttpError';
import { Op, WhereOptions } from 'sequelize';

import { ISupplier } from './SuppliersModel.types';

export default class ListSuppliersModel {
  public async getSuppliers(
    order: string,
    direction: string,
    status?: string,
  ): Promise<ISupplier[]> {
    try {
      let whereClause: WhereOptions = {};
      if (status)
        whereClause = {
          status: {
            [Op.eq]: status,
            [Op.not]: 'inactive',
          },
        };
      const suppliers: any = await suppliersModel.findAll({
        where: whereClause,
        order: [[order, direction]],
        include: [
          {
            model: SuppliersAddressesModel,
            as: 'supplier_addresses',
            include: [
              {
                model: AddressesModel,
                as: 'address',
                attributes: [
                  'id',
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
      return suppliers;
    } catch (error) {
      throw new HttpError(500, 'Erro ao listar fornecedores.', error);
    }
  }

  public async getSupplier(supplierId: number): Promise<ISupplier> {
    try {
      const suppliers: any = await suppliersModel.findByPk(supplierId, {
        include: [
          {
            model: SuppliersAddressesModel,
            as: 'supplier_addresses',
            include: [
              {
                model: AddressesModel,
                as: 'address',
                attributes: [
                  'id',
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
      if (!suppliers) throw new HttpError(404, 'Fornecedor não encontrado.');
      return suppliers;
    } catch (error) {
      if (error instanceof HttpError)
        throw new HttpError(error.statusCode, error.message, error);
      throw new HttpError(500, 'Erro ao listar funcionário.', error);
    }
  }
}
