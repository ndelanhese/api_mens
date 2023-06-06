/* eslint-disable @typescript-eslint/no-explicit-any */
import paymentMethodsModel from '@db-models/MethodsOfPaymentsModel';
import salesPaymentMethodsModel from '@db-models/SalesMethodsOfPaymentsModel';
import HttpError from '@exceptions/HttpError';
import { WhereOptions, Op } from 'sequelize';

import { IPaymentMethodsResponse } from './PaymentsMethods.types';

export default class PaymentMethodsModel {
  public async getPaymentMethods(
    initial_date?: Date,
    final_date?: Date,
    order = 'id',
    direction = 'ASC',
  ): Promise<IPaymentMethodsResponse[]> {
    try {
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

      const paymentMethods: any[] = await salesPaymentMethodsModel.findAll({
        where: whereClause,
        order: [[order, direction]],
        include: [
          {
            model: paymentMethodsModel,
            as: 'method',
          },
        ],
      });
      return paymentMethods;
    } catch (error) {
      throw new HttpError(500, 'Erro ao buscar métodos de pagamento.', error);
    }
  }
}
