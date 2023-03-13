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

  async import(
    products: IProducts[],
    manufacturer_slug: string,
  ): Promise<Product[]> {
    const productsData = await this.productsModel.importProducts(
      products,
      manufacturer_slug.toUpperCase(),
    );
    return productsData.map(
      (product) =>
        new Product(
          product.manufacturer_slug,
          product.type,
          product.part_number,
          product.description,
          product.currency,
          product.contributor_price,
          product.outlet,
          product.note,
          product.exempt_price,
          product.id,
        ),
    );
  }

  async export(manufacturer_slug: string): Promise<Product[]> {
    const products = await this.productsModel.exportProducts(manufacturer_slug);
    return products.map(
      (product) =>
        new Product(
          product.manufacturer_slug,
          product.type,
          product.part_number,
          product.description,
          product.currency,
          product.contributor_price,
          product.outlet,
          product.note,
          product.exempt_price,
          product.id,
        ),
    );
  }
}
