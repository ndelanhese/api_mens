import addressesModel from '@db-models/AddressesModel';
import customersAddressesModel from '@db-models/CustomersAddressesModel';
import customerModel from '@db-models/CustomersModel';
import HttpError from '@exceptions/HttpError';

import Customer from '../../Domain/Entities/Customer';

export default class CustomersModel {
  public async getCustomerByPk(userId: number) {
    try {
      return await customerModel.findByPk(userId, {
        attributes: {
          exclude: ['password'],
        },
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao buscar cliente.', error);
    }
  }

  public async createCustomer(payload: Customer) {
    const verifyCustomer = await customerModel.findOne({
      where: { cpf: payload.getCpf() },
    });
    if (verifyCustomer) {
      throw new HttpError(400, 'Cliente já cadastrado.');
    }
    try {
      const customer = await customerModel.create({
        name: payload.getName(),
        cpf: payload.getCpf(),
        rg: payload.getRg(),
        birth_date: payload.getBirthDate(),
        phone: payload.getPhone(),
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

      await customersAddressesModel.create({
        customer_id: customer.id,
        address_id: address.id,
      });

      return { ...customer.toJSON(), ...address.toJSON() };
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, 'Erro ao cadastrar cliente.', error);
    }
  }

  public async updateCustomer(payload: Customer) {
    try {
      const customer = await customerModel.findByPk(payload.getId());
      if (!customer) {
        throw new HttpError(404, 'Cliente não encontrado.');
      }
      return await customer.update({
        name: payload.getName(),
        cpf: payload.getCpf(),
        rg: payload.getRg(),
        birth_date: payload.getBirthDate(),
        phone: payload.getPhone(),
        status: payload.getStatus(),
      });
    } catch (error) {
      if (error instanceof HttpError)
        throw new HttpError(error.statusCode, error.message, error);
      throw new HttpError(500, 'Erro ao atualizar cliente.', error);
    }
  }

  public async deleteCustomer(customerId: number) {
    try {
      const customer = await customerModel.findOne({
        where: { id: customerId },
      });
      if (!customer) {
        throw new HttpError(404, 'Cliente não encontrado.');
      }
      await customerModel.destroy({
        where: { id: customerId },
      });
      const customerAddress = await customersAddressesModel.findAll({
        where: { customer_id: customerId },
      });
      if (!customerAddress) {
        throw new HttpError(404, 'Endereço do cliente não encontrado.');
      }
      const addressesId = customerAddress.map(address => address.address_id);
      await customersAddressesModel.destroy({
        where: { customer_id: customerId },
      });
      await addressesModel.destroy({
        where: { id: addressesId },
      });
    } catch (error) {
      if (error instanceof HttpError)
        throw new HttpError(error.statusCode, error.message, error);
      throw new HttpError(500, 'Erro ao excluir cliente.', error);
    }
  }
}
