import Product from '../../Domain/Entities/Product';
import SheetService from '../../Domain/Services/SheetService';
import ProductRepository from '../../Infraestructure/Repositories/ProductRepository';
import ImportProductsInputData from '../Dtos/ImportProductsInputData';

export default class ImportProductsAction {
  async execute(input: ImportProductsInputData): Promise<Product[]> {
    const dataFromSheet = this.convertXlsx(
      input.table,
      input.manufacturer_slug,
    );
    const productsData = dataFromSheet.map(
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
        ),
    );
    const productRepository = new ProductRepository();
    const products = productsData.map((product) => ({
      manufacturer_slug: product.getManufacturerSlug().toUpperCase(),
      type: product.getType(),
      part_number: product.getPartNumber(),
      description: product.getDescription(),
      currency: product.getCurrency(),
      contributor_price: product.getContributorPrice(),
      exempt_price: product.getExemptPrice(),
      note: product.getNote(),
      outlet: product.isOutlet(),
    }));
    return await productRepository.import(products, input.manufacturer_slug);
  }
  private convertXlsx(sheet: Buffer, manufacturer_slug: string) {
    const sheetService = new SheetService();
    return sheetService.sheetToData(sheet, manufacturer_slug);
  }
}
