import Brand from '../../Domain/Entities/Brand';
import Category from '../../Domain/Entities/Category';
import Product from '../../Domain/Entities/Product';
import Supplier from '../../Domain/Entities/Supplier';
import BrandsModel from '../../Infrastructure/Models/BrandsModel';
import CategoriesModel from '../../Infrastructure/Models/CategoriesModel';
import SuppliersModel from '../../Infrastructure/Models/SuppliersModel';
import ProductRepository from '../../Infrastructure/Repositories/ProductRepository';
import SheetService from '../../Infrastructure/Services/SheetService';

export default class ExportProductsAction {
  async execute(): Promise<Buffer> {
    const productRepository = new ProductRepository();
    const products = await productRepository.export();
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
}
