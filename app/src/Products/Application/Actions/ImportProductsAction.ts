import Product from '../../Domain/Entities/Product';
import ProductRepository from '../../Infrastructure/Repositories/ProductRepository';
import SheetService from '../../Infrastructure/Services/SheetService';
import ImportProductsInputData from '../Dtos/ImportProductsInputData';

import { IImportProducts } from './ImportProductsAction.types';

export default class ImportProductsAction {
  async execute(input: ImportProductsInputData): Promise<IImportProducts> {
    const dataFromSheet = this.convertXlsx(input.table);
    const productsData = dataFromSheet.products.map(
      product =>
        new Product(
          product.part_number,
          product.name,
          product.description,
          product.price,
          product.quantity,
          //TODO -> adicionar: categoria, marca e fornecedor
        ),
    );
    const productRepository = new ProductRepository();
    const products = productsData.map(product => ({
      part_number: product.getPartNumber(),
      name: product.getName(),
      description: product.getDescription(),
      purchase_price: product.getPurchasePrice(),
      price: product.getPrice(),
      size: product.getSize(),
      color: product.getColor(),
      quantity: product.getQuantity(),
      category_id: Number(product.getCategory()?.getId()),
      brand_id: Number(product.getBrand()?.getId()),
      supplier_id: Number(product.getSupplier()?.getId()),
    }));
    await productRepository.import(products);
    const { errors } = dataFromSheet;
    return {
      ...(errors.length === 0 ? { errors: null } : { errors: errors }),
      successfulRows: dataFromSheet.products.length,
    };
  }

  private convertXlsx(sheet: Buffer) {
    const sheetService = new SheetService();
    return sheetService.sheetToData(sheet);
  }
}
