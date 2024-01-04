/* eslint-disable @typescript-eslint/no-explicit-any */
import productsModel from '@db-models/ProductsModel';
import HttpError from '@exceptions/HttpError';

import { Product } from './ProductsModel.types';

export default class ProductsModel {
  public async getProduct(id: number) {
    try {
      const product: any = await productsModel.findByPk(id, {});
      if (!product) throw new HttpError(404, 'Produto não encontrado.');
      return product as Product;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, 'Erro ao buscar produto.', error);
    }
  }
}
