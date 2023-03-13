import { Op } from 'sequelize';

import HttpError from '@exceptions/HttpError';
import productsModel from '@db-models/ProductsModel';
import {
  IProductResponse,
  IProductsParams,
  IProductsResponse,
  IProductsTypes,
} from './ProductsModel.types';

export default class ProductsModel {
  public async getProducts({
    order,
    direction,
    search,
    slug,
  }: IProductsParams): Promise<IProductsResponse> {
    try {
      const response = await productsModel.findAll({
        order: [[order, direction]],
        where: {
          manufacturer_slug: {
            [Op.iLike]: slug,
          },
          [Op.or]: {
            description: {
              [Op.like]: `%${search}%`,
            },
            part_number: {
              [Op.like]: `%${search}%`,
            },
          },
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });
      return { data: response };
    } catch (error) {
      throw new HttpError(500, 'Erro no Servidor.');
    }
  }

  public async getProductsTypes(): Promise<IProductsTypes | []> {
    try {
      const response = await productsModel.findAll({
        attributes: ['type'],
        group: ['type'],
      });
      if (response.length > 0) {
        return {
          data: response,
        };
      }
      return [];
    } catch (error) {
      throw new HttpError(500, 'Erro no Servidor.');
    }
  }

  public async getProductsByManufacturer(
    nameSlug: string,
  ): Promise<IProductsResponse | []> {
    try {
      const products = await productsModel.findAll({
        order: [['id', 'ASC']],
        where: {
          manufacturer_slug: {
            [Op.eq]: nameSlug,
          },
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });
      if (products.length > 0) {
        return { data: products };
      }
      return [];
    } catch (error) {
      throw new HttpError(500, 'Erro no Servidor.');
    }
  }

  public async getProductsById(id: number): Promise<IProductResponse> {
    try {
      const product = await productsModel.findByPk(id);
      if (product) return product;
      throw new HttpError(404, 'Produto não encontrado.');
    } catch {
      throw new HttpError(500, 'Erro ao buscar produto.');
    }
  }
}
