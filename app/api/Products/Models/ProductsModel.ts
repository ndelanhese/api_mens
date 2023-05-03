import productsModel from '@db-models/ProductsModel';
import HttpError from '@exceptions/HttpError';

export default class ProductsModel {
  public async getProducts(order: string, direction: string) {
    try {
      return await productsModel.findAll({
        order: [[order, direction]],
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao buscar produtos.', error);
    }
  }

  public async getProductsById(id: number) {
    try {
      const product = await productsModel.findByPk(id);
      if (!product) throw new HttpError(404, 'Produto não encontrado.');
      return product;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, 'Erro ao buscar produto.', error);
    }
  }
}

//TODO -> Adicionar filtros de produtos por chaves -> categoria, marca, preço, nome, part number, descrição.
