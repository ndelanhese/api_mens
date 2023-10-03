import {
  capitalizeFirstLetter,
  capitalizeWords,
} from '@app/src/Shared/Infrastructure/Utils/String';

import Brand from '../../Domain/Entities/Brand';
import Category from '../../Domain/Entities/Category';
import Product from '../../Domain/Entities/Product';
import Supplier from '../../Domain/Entities/Supplier';
import BrandsModel from '../../Infrastructure/Models/BrandsModel';
import CategoriesModel from '../../Infrastructure/Models/CategoriesModel';
import SuppliersModel from '../../Infrastructure/Models/SuppliersModel';
import ProductRepository from '../../Infrastructure/Repositories/ProductRepository';
import CreateProductInputData from '../Dtos/CreateProductInputData';

export default class CreateProductAction {
  async execute(input: CreateProductInputData): Promise<Product> {
    const productRepository = new ProductRepository();
    const category = await this.getCategory(input.category_id);
    const brand = await this.getBrand(input.brand_id);
    const supplier = await this.getSupplier(input.supplier_id);
    const product = new Product(
      capitalizeFirstLetter(input.name),
      capitalizeFirstLetter(input.description),
      input.price,
      input.quantity,
      input.status,
      undefined,
      category,
      brand,
      supplier,
      input.purchase_price,
      input.size,
      input.color,
    );
    const productCreated = await productRepository.save(product);
    return await productRepository.save(
      new Product(
        productCreated.getName(),
        productCreated.getDescription(),
        productCreated.getPrice(),
        productCreated.getQuantity(),
        input.status,
        this.generatePartNumber(
          category,
          brand,
          Number(productCreated.getId()),
        ),
        category,
        brand,
        supplier,
        productCreated.getPurchasePrice(),
        productCreated.getSize(),
        productCreated.getColor(),
        productCreated.getId(),
      ),
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
      capitalizeWords(supplier.contact_name),
      capitalizeWords(supplier.corporate_name),
      supplier.cnpj,
      supplier.status,
      supplier.id,
    );
  }

  private generatePartNumber(
    category: Category,
    brand: Brand,
    productId: number,
  ): string {
    const brandName = brand.getName().slice(0, 3).toUpperCase();
    const categoryName = category.getName().toUpperCase();
    const categoryAbbreviation = categoryName
      .split(' ')
      .map(word => word[0])
      .join('');
    return `${brandName}-${categoryAbbreviation}-${productId}`;
  }
}
