import productModel from '@db-models/ProductsModel';
import HttpError from '@exceptions/HttpError';

import Product from '../../Domain/Entities/Product';

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

  public async exportProducts(): Promise<IProductModel[]> {
    try {
      return await productModel.findAll({
        order: [['id', 'ASC']],
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao exportar os produtos.', error);
    }
  }
}
