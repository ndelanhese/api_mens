import Product from '../../Domain/Entities/Product';
import ProductRepository from '../../Infrastructure/Repositories/ProductRepository';
import SheetService from '../../Infrastructure/Services/SheetService';

export default class ExportProductsAction {
  async execute(): Promise<Buffer> {
    const productRepository = new ProductRepository();
    const products = await productRepository.export();
    return this.convertXlsx(products);
  }
  private convertXlsx(products: Product[]) {
    const sheetService = new SheetService();
    return sheetService.dataToSheet(products);
  }
}
