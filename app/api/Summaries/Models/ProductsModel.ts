/* eslint-disable @typescript-eslint/no-explicit-any */
import productsModel from '@db-models/ProductsModel';
import salesProductsModel from '@db-models/SalesProductsModel';
import HttpError from '@exceptions/HttpError';
import { WhereOptions, Op } from 'sequelize';

import { IProductsResponse } from './ProductsModel.types';

export default class ProductsModel {
  public async getProducts(
    initial_date?: Date,
    final_date?: Date,
    initial_value?: number,
    final_value?: number,
    order = 'id',
    direction = 'ASC',
  ): Promise<IProductsResponse[]> {
    try {
      let whereClause: WhereOptions = {};
      if (initial_value || final_value) {
        whereClause = {
          ...whereClause,
          price: {
            ...(initial_value && { [Op.gte]: initial_value }),
            ...(final_value && { [Op.lte]: final_value }),
          },
        };
      }
      if (initial_date || final_date) {
        whereClause = {
          ...whereClause,
          createdAt: {
            ...(initial_date && { [Op.gte]: initial_date }),
            ...(final_date && { [Op.lte]: final_date }),
          },
        };
      }

      const products: any[] = await salesProductsModel.findAll({
        where: whereClause,
        order: [[order, direction]],
        include: [
          {
            model: productsModel,
            as: 'product',
          },
        ],
      });
      return products;
    } catch (error) {
      throw new HttpError(500, 'Erro ao buscar produtos.', error);
    }
  }
}
