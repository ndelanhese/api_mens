import Brand from '../../Domain/Entities/Brand';
import Category from '../../Domain/Entities/Category';
import Product from '../../Domain/Entities/Product';
import Supplier from '../../Domain/Entities/Supplier';
import BrandsModel from '../../Infrastructure/Models/BrandsModel';
import CategoriesModel from '../../Infrastructure/Models/CategoriesModel';
import SuppliersModel from '../../Infrastructure/Models/SuppliersModel';
import ProductRepository from '../../Infrastructure/Repositories/ProductRepository';
import SheetService from '../../Infrastructure/Services/SheetService';
import ExportProductInputData from '../Dtos/ExportProductInputData';

export default class ExportProductsAction {
  async execute(input: ExportProductInputData): Promise<Buffer> {
    const productRepository = new ProductRepository();
    const categories_id = this.parseToNumberArray(input.categories_id);
    const brands_id = this.parseToNumberArray(input.brands_id);
    const { final_value, initial_value } = input;
    const products = await productRepository.export({
      categories_id,
      brands_id,
      initial_value,
      final_value,
    });
    const productsData = await Promise.all(
      products.map(async product => {
        const category = await this.getCategory(product.category_id);
        const brand = await this.getBrand(product.brand_id);
        const supplier = await this.getSupplier(product.supplier_id);
        return new Product(
          product.name,
          product.description,
          product.price,
          product.quantity,
          product.status,
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
    return this.convertXlsx(productsData);
  }

  private convertXlsx(products: Product[]) {
    const sheetService = new SheetService();
    return sheetService.dataToSheet(products);
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

  private parseToNumberArray(value: string | undefined) {
    if (value !== 'undefined' && value) {
      if (value.includes(',')) {
        return value.split(',').map(v => parseInt(v));
      }
      return [parseInt(value)];
    }
    return [];
  }
}
