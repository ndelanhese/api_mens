import Product from '../../Domain/Entities/Product';
import SheetService from '../../Domain/Services/SheetService';
import ProductRepository from '../../Infraestructure/Repositories/ProductRepository';
import ExportProductsInputData from '../Dtos/ExportProductsInputData';

export default class ExportProductsAction {
  async execute(input: ExportProductsInputData): Promise<Buffer> {
    const productRepository = new ProductRepository();
    const products = await productRepository.export(input.manufacturer_slug);
    return this.convertXlsx(products);
  }
  private convertXlsx(products: Product[]) {
    const sheetService = new SheetService();
    return sheetService.dataToSheet(products);
  }
}
