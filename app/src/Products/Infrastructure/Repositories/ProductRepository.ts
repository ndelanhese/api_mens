import Product from '../../Domain/Entities/Product';
import ProductModel from '../Models/ProductModel';

import { IProductsExportProps } from './ProductRepository.types';

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

  async updateStock(id: number, quantity: number) {
    await this.productsModel.updateProductStock(id, quantity);
  }

  async export(input: IProductsExportProps) {
    return await this.productsModel.exportProducts(input);
  }
}
