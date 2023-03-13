import { Op } from 'sequelize';
import productsModel from '@db-models/ProductsModel';
import HttpError from '@exceptions/HttpError';
import {
  IManufacturers,
  IProducts,
  IProductsParams,
  IProductsType,
} from './ProductsModel.types';

export default class ProductsModel {
  public async getProducts({
    order,
    direction,
    partNumber,
    description,
    manufacturer,
    type,
  }: IProductsParams): Promise<IProducts[]> {
    try {
      return await productsModel.findAll({
        order: [[order, direction]],
        where: {
          [Op.and]: {
            description: {
              [Op.iLike]: `%${description}%`,
            },
            part_number: {
              [Op.like]: `%${partNumber}%`,
            },
            manufacturer_slug: {
              [Op.like]: `%${manufacturer}%`,
            },
            type: {
              [Op.like]: `${type}`,
            },
          },
        },
      });
    } catch (error) {
      throw new HttpError(500, 'Erro no Servidor.');
    }
  }

  public async findAllProductsTypes(): Promise<IProductsType[]> {
    try {
      return await productsModel.findAll({
        attributes: ['type'],
        group: ['type'],
      });
    } catch (error) {
      throw new HttpError(500, 'Erro no Servidor.');
    }
  }

  public async getProductsManufacturer(): Promise<IManufacturers[]> {
    try {
      return await productsModel.findAll({
        attributes: ['manufacturer_slug'],
        group: ['manufacturer_slug'],
      });
    } catch (error) {
      throw new HttpError(500, 'Erro no Servidor.');
    }
  }
}
