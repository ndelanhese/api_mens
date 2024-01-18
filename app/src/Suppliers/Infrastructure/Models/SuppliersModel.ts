import suppliersAddressesModel from '@app/database/Models/SuppliersAddressesModel';
import addressesModel from '@db-models/AddressesModel';
import supplierModel from '@db-models/SuppliersModel';
import HttpError from '@exceptions/HttpError';

import Supplier from '../../Domain/Entities/Supplier';

export default class SuppliersModel {
  public async getSupplierByPk(supplierId: number) {
    try {
      return await supplierModel.findByPk(supplierId);
    } catch (error) {
      throw new HttpError(500, 'Erro ao buscar fornecedor.', error);
    }
  }

  public async createSupplier(payload: Supplier) {
    const verifySupplier = await supplierModel.findOne({
      where: { cnpj: payload.getCnpj() },
    });
    if (verifySupplier) {
      throw new HttpError(400, 'Fornecedor já cadastrado.');
    }
    try {
      const supplier = await supplierModel.create({
        contact_name: payload.getContactName(),
        corporate_name: payload.getCorporateName(),
        cnpj: payload.getCnpj(),
        status: payload.getStatus(),
      });

      const address = await addressesModel.create({
        address: String(payload?.getAddress()?.getAddress()),
        number: String(payload?.getAddress()?.getNumber()),
        district: String(payload?.getAddress()?.getDistrict()),
        postal_code: String(payload?.getAddress()?.getPostalCode()),
        city: String(payload?.getAddress()?.getCity()),
        state: String(payload?.getAddress()?.getState()),
      });

      await suppliersAddressesModel.create({
        supplier_id: supplier.id,
        address_id: address.id,
      });

      return { ...supplier.toJSON(), ...address.toJSON() };
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, 'Erro ao cadastrar fornecedor.', error);
    }
  }

  public async updateSupplier(payload: Supplier) {
    try {
      const supplier = await supplierModel.findByPk(payload.getId());
      if (!supplier) {
        throw new HttpError(404, 'Fornecedor não encontrado.');
      }
      return await supplier.update({
        contact_name: payload.getContactName(),
        corporate_name: payload.getCorporateName(),
        cnpj: payload.getCnpj(),
        status: payload.getStatus(),
      });
    } catch (error) {
      if (error instanceof HttpError)
        throw new HttpError(error.statusCode, error.message, error);
      throw new HttpError(500, 'Erro ao atualizar fornecedor.', error);
    }
  }

  public async deleteSupplier(supplierId: number) {
    try {
      const supplier = await supplierModel.findOne({
        where: { id: supplierId },
      });
      if (!supplier) {
        throw new HttpError(404, 'Fornecedor não encontrado.');
      }
      await supplierModel.update(
        { status: 'inactive' },
        {
          where: { id: supplierId },
        },
      );
      const supplierAddress = await suppliersAddressesModel.findAll({
        where: { supplier_id: supplierId },
      });
      if (!supplierAddress) {
        throw new HttpError(404, 'Endereço do fornecedor não encontrado.');
      }
      const addressesId = supplierAddress.map(address => address.address_id);
      await suppliersAddressesModel.destroy({
        where: { supplier_id: supplierId },
      });
      await addressesModel.destroy({
        where: { id: addressesId },
      });
    } catch (error) {
      if (error instanceof HttpError)
        throw new HttpError(error.statusCode, error.message, error);
      throw new HttpError(500, 'Erro ao excluir fornecedor.', error);
    }
  }
}
