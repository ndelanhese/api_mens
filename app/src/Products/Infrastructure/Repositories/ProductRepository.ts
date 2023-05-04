import Product from '../../Domain/Entities/Product';
import ProductModel from '../Models/ProductModel';

import { IProducts } from './ProductRepository.types';

export default class ProductRepository {
  private productsModel: ProductModel;

  constructor() {
    this.productsModel = new ProductModel();
  }

  async save(product: Product): Promise<Product> {
    if (product.getId()) {
      return this.update(product);
    }
    return this.create(product);
  }

  async create(product: Product): Promise<Product> {
    const { id } = await this.productsModel.createProduct(product);
    return product.setId(id);
  }

  async delete(productId: number): Promise<void> {
    await this.productsModel.deleteProduct(productId);
  }

  async update(product: Product): Promise<Product> {
    await this.productsModel.updateProduct(product);
    return product;
  }

  async import(products: IProducts[]): Promise<void> {
    await this.productsModel.importProducts(products);
  }

  async export(): Promise<Product[]> {
    const products = await this.productsModel.exportProducts();
    return products.map(
      product =>
        new Product(
          product.name,
          product.description,
          product.price,
          product.quantity,
          product.part_number,
          //TODO -> adicionar: categoria, marca e fornecedor
        ),
    );
  }
}
