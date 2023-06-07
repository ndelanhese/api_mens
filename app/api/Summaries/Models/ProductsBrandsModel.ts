/* eslint-disable @typescript-eslint/no-explicit-any */
import BrandsModel from '@db-models/BrandsModel';
import productsModel from '@db-models/ProductsModel';
import salesProductsModel from '@db-models/SalesProductsModel';
import HttpError from '@exceptions/HttpError';
import { Op, WhereOptions } from 'sequelize';

import { IProductsBrandsResponse } from './ProductsBrandsModel.types';

export default class ProductsBrandsModel {
  public async getProducts(
    initial_date?: Date,
    final_date?: Date,
    order = 'id',
    direction = 'ASC',
  ): Promise<IProductsBrandsResponse[]> {
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
                model: BrandsModel,
                as: 'brand',
                attributes: ['id', 'name'],
              },
            ],
          },
        ],
      });
      return products;
    } catch (error) {
      throw new HttpError(500, 'Erro ao buscar marcas de produtos.', error);
    }
  }
}
