import ordersModel from '@db-models/OrdersModel';
import HttpError from '@exceptions/HttpError';
import { Op, WhereOptions } from 'sequelize';

import { IOrderFilter } from './OrdersModel.types';

export default class OrdersModel {
  public async getOrders(input: IOrderFilter) {
    try {
      const { initial_date, final_date } = input;
      let whereClause: WhereOptions = {};
      if (initial_date || final_date) {
        whereClause = {
          ...whereClause,
          date: {
            ...(initial_date && { [Op.gte]: initial_date }),
            ...(final_date && { [Op.lte]: final_date }),
          },
        };
      }
      whereClause = { ...whereClause, status: { [Op.not]: 'canceled' } };
      return await ordersModel.findAll({
        order: [['id', 'DESC']],
        where: whereClause,
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao listar pedidos.', error);
    }
  }
}
