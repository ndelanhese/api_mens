import addressesModel from '@db-models/AddressesModel';
import employeesAddressesModel from '@db-models/EmployeesAddressesModel';
import employeeModel from '@db-models/EmployeesModel';
import HttpError from '@exceptions/HttpError';

import Employee from '../../Domain/Entities/Employee';

export default class EmployeesModel {
  public async getEmployeeByPk(employeeId: number) {
    try {
      return await employeeModel.findByPk(employeeId);
    } catch (error) {
      throw new HttpError(500, 'Erro ao buscar funcionário.', error);
    }
  }

  public async createEmployee(payload: Employee) {
    const verifyEmployee = await employeeModel.findOne({
      where: { cpf: payload.getCpf() },
    });
    if (verifyEmployee) {
      throw new HttpError(400, 'Funcionário já cadastrado.');
    }
    try {
      const employee = await employeeModel.create({
        name: payload.getName(),
        cpf: payload.getCpf(),
        rg: payload.getRg(),
        birth_date: payload.getBirthDate(),
        phone: payload.getPhone(),
        pis_pasep: payload.getPisPasep(),
        admission_date: payload.getAdmissionDate(),
        resignation_date: payload.getResignationDate(),
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

      await employeesAddressesModel.create({
        employee_id: employee.id,
        address_id: address.id,
      });

      return { ...employee.toJSON(), ...address.toJSON() };
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, 'Erro ao cadastrar funcionário.', error);
    }
  }

  public async updateEmployee(payload: Employee) {
    try {
      const employee = await employeeModel.findByPk(payload.getId());
      if (!employee) {
        throw new HttpError(404, 'Funcionário não encontrado.');
      }
      return await employee.update({
        name: payload.getName(),
        cpf: payload.getCpf(),
        rg: payload.getRg(),
        birth_date: payload.getBirthDate(),
        phone: payload.getPhone(),
        pis_pasep: payload.getPisPasep(),
        admission_date: payload.getAdmissionDate(),
        resignation_date: payload.getResignationDate(),
        status: payload.getStatus(),
      });
    } catch (error) {
      if (error instanceof HttpError)
        throw new HttpError(error.statusCode, error.message, error);
      throw new HttpError(500, 'Erro ao atualizar funcionário.', error);
    }
  }

  public async deleteEmployee(employeeId: number) {
    try {
      const employee = await employeeModel.findOne({
        where: { id: employeeId },
      });
      if (!employee) {
        throw new HttpError(404, 'Funcionário não encontrado.');
      }
      await employeeModel.destroy({
        where: { id: employeeId },
      });
      const employeeAddress = await employeesAddressesModel.findAll({
        where: { employee_id: employeeId },
      });
      if (!employeeAddress) {
        throw new HttpError(404, 'Endereço do funcionário não encontrado.');
      }
      const addressesId = employeeAddress.map(address => address.address_id);
      await employeesAddressesModel.destroy({
        where: { employee_id: employeeId },
      });
      await addressesModel.destroy({
        where: { id: addressesId },
      });
    } catch (error) {
      if (error instanceof HttpError)
        throw new HttpError(error.statusCode, error.message, error);
      throw new HttpError(500, 'Erro ao excluir funcionário.', error);
    }
  }
}
