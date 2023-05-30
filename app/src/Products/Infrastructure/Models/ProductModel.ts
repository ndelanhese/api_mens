import productModel from '@db-models/ProductsModel';
import HttpError from '@exceptions/HttpError';
import { Op, WhereOptions } from 'sequelize';

import Product from '../../Domain/Entities/Product';
import { IProductsExportProps } from '../Repositories/ProductRepository.types';

import { IProductModel } from './ProductModel.types';

export default class ProductsModel {
  public async createProduct(payload: Product) {
    try {
      const categoryId = payload.getCategory()?.getId() ?? 1;
      const brandId = payload.getBrand()?.getId() ?? 1;
      const supplierId = payload.getSupplier()?.getId() ?? 1;
      return await productModel.create({
        part_number: payload.getPartNumber(),
        name: payload.getName(),
        description: payload.getDescription(),
        purchase_price: payload.getPurchasePrice(),
        price: payload.getPrice(),
        size: payload.getSize(),
        color: payload.getColor(),
        quantity: payload.getQuantity(),
        category_id: categoryId,
        brand_id: brandId,
        supplier_id: supplierId,
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao criar produto.', error);
    }
  }

  public async updateProduct(payload: Product): Promise<void> {
    try {
      const categoryId = payload.getCategory()?.getId();
      const brandId = payload.getBrand()?.getId();
      const supplierId = payload.getSupplier()?.getId();
      await productModel.update(
        {
          part_number: payload.getPartNumber(),
          name: payload.getName(),
          description: payload.getDescription(),
          purchase_price: payload.getPurchasePrice(),
          price: payload.getPrice(),
          size: payload.getSize(),
          color: payload.getColor(),
          quantity: payload.getQuantity(),
          category_id: categoryId,
          brand_id: brandId,
          supplier_id: supplierId,
        },
        {
          where: {
            id: payload.getId(),
          },
        },
      );
    } catch (error) {
      throw new HttpError(500, 'Erro ao atualizar o produto.', error);
    }
  }

  public async updateProductStock(id: number, quantity: number) {
    try {
      await productModel.update(
        {
          quantity,
        },
        {
          where: {
            id,
          },
        },
      );
    } catch (error) {
      throw new HttpError(
        500,
        'Erro ao atualizar o estoque do produto.',
        error,
      );
    }
  }

  public async deleteProduct(id: number): Promise<void> {
    try {
      await productModel.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao deletar o produto.', error);
    }
  }

  public async exportProducts(
    input: IProductsExportProps,
  ): Promise<IProductModel[]> {
    try {
      const { initial_value, final_value, brands_id, categories_id } = input;
      let whereClause: WhereOptions = {};
      if (initial_value || final_value) {
        whereClause = {
          ...whereClause,
          createdAt: {
            ...(initial_value && { [Op.gte]: initial_value }),
            ...(final_value && { [Op.lte]: final_value }),
          },
        };
      }
      if (brands_id?.length !== 0) {
        whereClause = { ...whereClause, brand_id: { [Op.in]: brands_id } };
      }
      if (categories_id?.length !== 0) {
        whereClause = {
          ...whereClause,
          category_id: { [Op.in]: categories_id },
        };
      }
      return await productModel.findAll({
        order: [['id', 'ASC']],
        where: whereClause,
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao exportar os produtos.', error);
    }
  }
}
