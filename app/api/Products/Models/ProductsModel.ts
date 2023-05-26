import BrandsModel from '@db-models/BrandsModel';
import categoriesModel from '@db-models/CategoriesModel';
import productsModel from '@db-models/ProductsModel';
import SuppliersModel from '@db-models/SuppliersModel';
import HttpError from '@exceptions/HttpError';

export default class ProductsModel {
  public async getProducts(order: string, direction: string) {
    try {
      return await productsModel.findAll({
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
    } catch (error) {
      throw new HttpError(500, 'Erro ao buscar produtos.', error);
    }
  }

  public async getProduct(id: number) {
    try {
      const product = await productsModel.findByPk(id, {
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
      return product;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, 'Erro ao buscar produto.', error);
    }
  }
}

//TODO -> Adicionar filtros de produtos por chaves -> categoria, marca, preço, nome, part number, descrição.
