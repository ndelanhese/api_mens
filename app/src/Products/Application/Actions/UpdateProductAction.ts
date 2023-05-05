import Brand from '../../Domain/Entities/Brand';
import Category from '../../Domain/Entities/Category';
import Product from '../../Domain/Entities/Product';
import Supplier from '../../Domain/Entities/Supplier';
import BrandsModel from '../../Infrastructure/Models/BrandsModel';
import CategoriesModel from '../../Infrastructure/Models/CategoriesModel';
import SuppliersModel from '../../Infrastructure/Models/SuppliersModel';
import ProductRepository from '../../Infrastructure/Repositories/ProductRepository';
import UpdateProductInputData from '../Dtos/UpdateProductInputData';

export default class UpdateProductAction {
  async execute(
    input: UpdateProductInputData,
    currentValue: Product,
  ): Promise<Product> {
    const { category_id, brand_id, supplier_id, part_number } = input;
    const category = category_id
      ? await this.getCategory(category_id)
      : undefined;
    const brand = brand_id ? await this.getBrand(brand_id) : undefined;
    const supplier = supplier_id
      ? await this.getSupplier(supplier_id)
      : undefined;
    //TODO -> Verificar essa lógica de geração de partNumber
    const partNumber = part_number
      ? this.generatePartNumber(category, brand, currentValue.getId())
      : currentValue.getPartNumber();
    const productRepository = new ProductRepository();
    const product = new Product(
      input.name ?? currentValue.getName(),
      input.description ?? currentValue.getDescription(),
      input.price ?? currentValue.getPrice(),
      input.quantity ?? currentValue.getQuantity(),
      partNumber,
      category ?? currentValue.getCategory(),
      brand ?? currentValue.getBrand(),
      supplier ?? currentValue.getSupplier(),
      input.purchase_price ?? currentValue.getPurchasePrice(),
      input.size ?? currentValue.getSize(),
      input.color ?? currentValue.getColor(),
      currentValue.getId(),
    );
    return await productRepository.save(product);
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

  private generatePartNumber(
    category?: Category,
    brand?: Brand,
    productId?: number,
  ): string {
    const brandName = brand?.getName().slice(0, 3).toUpperCase();
    const categoryName = category?.getName().toUpperCase();
    const categoryAbbreviation = categoryName
      ?.split(' ')
      .map(word => word[0])
      .join('');
    return `${brandName}-${categoryAbbreviation}-${productId}`;
  }
}
