import Brand from '../../Domain/Entities/Brand';
import Category from '../../Domain/Entities/Category';
import Product from '../../Domain/Entities/Product';
import Supplier from '../../Domain/Entities/Supplier';
import BrandsModel from '../Models/BrandsModel';
import CategoriesModel from '../Models/CategoriesModel';
import ProductModel from '../Models/ProductModel';
import SuppliersModel from '../Models/SuppliersModel';

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

  async updateStock(id: number, quantity: number) {
    await this.productsModel.updateProductStock(id, quantity);
  }

  async import(products: IProducts[]): Promise<void> {
    await this.productsModel.importProducts(products);
  }

  async export(): Promise<Product[]> {
    const products = await this.productsModel.exportProducts();
    return Promise.all(
      products.map(async product => {
        const category = await this.getCategory(product.category_id);
        const brand = await this.getBrand(product.brand_id);
        const supplier = await this.getSupplier(product.supplier_id);
        return new Product(
          product.name,
          product.description,
          product.price,
          product.quantity,
          product.part_number,
          category,
          brand,
          supplier,
          product.purchase_price,
          product.size,
          product.color,
        );
      }),
    );
  }

  private async getCategory(categoryId: number): Promise<Category> {
    const categoriesModel = new CategoriesModel();
    const category = await categoriesModel.getCategory(categoryId);
    return new Category(category.name, category.id);
  }

  private async getBrand(brandId: number): Promise<Brand> {
    const brandsModel = new BrandsModel();
    const brand = await brandsModel.getBrand(brandId);
    return new Brand(brand.name, brand.id);
  }

  private async getSupplier(supplierId: number): Promise<Supplier> {
    const supplierModel = new SuppliersModel();
    const supplier = await supplierModel.getSupplier(supplierId);
    return new Supplier(
      supplier.contact_name,
      supplier.corporate_name,
      supplier.cnpj,
      supplier.status,
      supplier.id,
    );
  }
}
