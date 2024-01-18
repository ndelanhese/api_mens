import customerModel from '@db-models/CustomersModel';
import HttpError from '@exceptions/HttpError';
import { Op, WhereOptions } from 'sequelize';

import { ICustomerFilter } from './CustomersModel.types';

export default class CustomersModel {
  public async getCustomers(input: ICustomerFilter) {
    try {
      const { initial_date, final_date } = input;
      let whereClause: WhereOptions = {};
      if (initial_date || final_date) {
        whereClause = {
          ...whereClause,
          createdAt: {
            ...(initial_date && { [Op.gte]: initial_date }),
            ...(final_date && { [Op.lte]: final_date }),
          },
        };
      }
      whereClause = {
        ...whereClause,
        status: { [Op.eq]: 'active' },
      };
      return await customerModel.findAll({
        order: [['id', 'DESC']],
        where: whereClause,
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao listar clientes.', error);
    }
  }
}
