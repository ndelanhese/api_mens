/* eslint-disable @typescript-eslint/no-explicit-any */
import BrandsModel from '@db-models/BrandsModel';
import categoriesModel from '@db-models/CategoriesModel';
import productsModel from '@db-models/ProductsModel';
import SuppliersModel from '@db-models/SuppliersModel';
import HttpError from '@exceptions/HttpError';
import { WhereOptions, Op } from 'sequelize';

import { Product } from './ProductsModel.types';

export default class ProductsModel {
  public async getProducts(
    order: string,
    direction: string,
    category_id?: number,
    brand_id?: number,
    supplier_id?: number,
    initial_value?: number,
    final_value?: number,
    name?: string,
    part_number?: string,
    description?: string,
    status?: string,
    showSoldOutProducts = false,
  ) {
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
      if (name) {
        whereClause = { ...whereClause, name: { [Op.iLike]: `%${name}%` } };
      }
      if (part_number) {
        whereClause = {
          ...whereClause,
          part_number: { [Op.iLike]: `%${part_number}%` },
        };
      }
      if (description) {
        whereClause = {
          ...whereClause,
          description: { [Op.iLike]: `%${description}%` },
        };
      }
      if (category_id) {
        whereClause = { ...whereClause, category_id };
      }
      if (brand_id) {
        whereClause = { ...whereClause, brand_id };
      }
      if (supplier_id) {
        whereClause = { ...whereClause, supplier_id };
      }
      if (!showSoldOutProducts) {
        whereClause = { ...whereClause, quantity: { [Op.gte]: 1 } };
      }
      if (status)
        whereClause = {
          status: {
            [Op.eq]: status,
            [Op.not]: 'inactive',
          },
        };
      const products: any = await productsModel.findAll({
        where: whereClause,
        order: [[order, direction]],
        attributes: { exclude: ['category_id', 'brand_id', 'supplier_id'] },
        include: [
          {
            model: categoriesModel,
            as: 'category',
            attributes: ['id', 'name'],
          },
          {
            model: BrandsModel,
            as: 'brand',
            attributes: ['id', 'name'],
          },
          {
            model: SuppliersModel,
            as: 'supplier',
            attributes: ['id', 'contact_name', 'corporate_name', 'cnpj'],
          },
        ],
      });
      return products as Product[];
    } catch (error) {
      throw new HttpError(500, 'Erro ao buscar produtos.', error);
    }
  }

  public async getProduct(id: number) {
    try {
      const product: any = await productsModel.findByPk(id, {
        attributes: { exclude: ['category_id', 'brand_id', 'supplier_id'] },
        include: [
          {
            model: categoriesModel,
            as: 'category',
            attributes: ['id', 'name'],
          },
          {
            model: BrandsModel,
            as: 'brand',
            attributes: ['id', 'name'],
          },
          {
            model: SuppliersModel,
            as: 'supplier',
            attributes: ['id', 'contact_name', 'corporate_name', 'cnpj'],
          },
        ],
      });
      if (!product) throw new HttpError(404, 'Produto não encontrado.');
      return product as Product;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, 'Erro ao buscar produto.', error);
    }
  }

  public async getProductsStock(status?: string, limit?: number) {
    try {
      return await productsModel.findAll({
        where: { status, quantity: { [Op.lte]: limit } },
        attributes: ['id', 'name', 'part_number', 'description', 'quantity'],
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao buscar estoque produtos.', error);
    }
  }
}
