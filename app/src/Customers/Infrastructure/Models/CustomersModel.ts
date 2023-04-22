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
        address: payload.getAddress().getAddress(),
        number: payload.getAddress().getNumber(),
        district: payload.getAddress().getDistrict(),
        postal_code: payload.getAddress().getPostalCode(),
        city: payload.getAddress().getCity(),
        state: payload.getAddress().getState(),
      });

      await customersAddressesModel.create({
        customer_id: customer.id,
        address_id: address.id,
      });

      return { ...customer.toJSON(), ...address.toJSON() };
    } catch (error) {
      throw new HttpError(500, 'Erro ao cadastrar cliente.', error);
    }
  }

  public async updateCustomer(payload: Customer) {
    try {
      const customer = await customerModel.findByPk(payload.getId());
      if (!customer) {
        throw new HttpError(404, 'Cliente não encontrado.');
      }
      await customer.update({
        name: payload.getName(),
        cpf: payload.getCpf(),
        rg: payload.getRg(),
        birth_date: payload.getBirthDate(),
        phone: payload.getPhone(),
        status: payload.getStatus(),
      });
      const address = await addressesModel.findByPk(
        payload.getAddress().getId(),
      );
      if (!address) {
        throw new HttpError(404, 'Endereço não encontrado.');
      }
      await address.update({
        address: payload.getAddress().getAddress(),
        number: payload.getAddress().getNumber(),
        district: payload.getAddress().getDistrict(),
        postal_code: payload.getAddress().getPostalCode(),
        city: payload.getAddress().getCity(),
        state: payload.getAddress().getState(),
      });
      return { ...customer.toJSON(), ...address.toJSON() };
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
