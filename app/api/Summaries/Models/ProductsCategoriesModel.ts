/* eslint-disable @typescript-eslint/no-explicit-any */
import CategoriesModel from '@db-models/CategoriesModel';
import productsModel from '@db-models/ProductsModel';
import salesProductsModel from '@db-models/SalesProductsModel';
import HttpError from '@exceptions/HttpError';
import { Op, WhereOptions } from 'sequelize';

import { IProductsCategoriesResponse } from './ProductsCategoriesModel.types';

export default class ProductsCategoriesModel {
  public async getProducts(
    initial_date?: Date,
    final_date?: Date,
    order = 'id',
    direction = 'ASC',
  ): Promise<IProductsCategoriesResponse[]> {
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

      const products: any[] = await salesProductsModel.findAll({
        where: whereClause,
        order: [[order, direction]],
        attributes: ['id'],
        include: [
          {
            model: productsModel,
            as: 'product',
            attributes: ['id'],
            include: [
              {
                model: CategoriesModel,
                as: 'category',
                attributes: ['id', 'name'],
              },
            ],
          },
        ],
      });
      return products;
    } catch (error) {
      throw new HttpError(500, 'Erro ao buscar categorias de produtos.', error);
    }
  }
}
