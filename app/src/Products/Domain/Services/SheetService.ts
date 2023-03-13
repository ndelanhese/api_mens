import HttpError from '@exceptions/HttpError';
import xlsx from 'xlsx';
import { IProducts, IProductsJson } from './SheetService.types';
import Product from '../Entities/Product';

export default class SheetService {
  public sheetToData(file: Buffer, manufacturer_slug: string) {
    const jsonData = this.fileToJson(file);
    return this.jsonToSheet(jsonData, manufacturer_slug);
  }

  public dataToSheet(products: Product[]): Buffer {
    const workSheetName = 'SheetJS';
    const rowsData = products.map((item) => ({
      'Part number': item.getPartNumber(),
      Descrição: item.getDescription(),
      Fabricante: item.getManufacturerSlug(),
      Tipo: item.getType(),
      Moeda: item.getCurrency(),
      'PREÇO PARA 4% DE ICMS - CONTRIBUINTE': item.getContributorPrice(),
      ...(item.getExemptPrice()
        ? { 'PREÇO - ISENTO': 'SOB CONSULTA' }
        : { 'PREÇO - ISENTO': item.getExemptPrice() }),
      ...(item.isOutlet() ? { Outlet: 'X' } : { Outlet: '' }),
      Observações: item.getNote(),
    }));
    const workSheet = xlsx.utils.json_to_sheet(rowsData);
    const workBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
    return xlsx.write(workBook, { type: 'buffer', bookType: 'xlsx' });
  }

  private jsonToSheet(
    json: IProductsJson[],
    manufacturer_slug: string,
  ): IProducts[] {
    return json.map((product) => ({
      manufacturer_slug,
      ...(product.TIPO ? { type: product.TIPO } : { type: ' ' }),
      ...(product['PART NUMBER']
        ? { part_number: product['PART NUMBER'] }
        : { part_number: ' ' }),
      ...(product.DESCRIÇÃO
        ? { description: product.DESCRIÇÃO }
        : { description: ' ' }),
      ...(product.MOEDA ? { currency: product.MOEDA } : { currency: '$' }),
      ...(product['PREÇO PARA 4% DE ICMS - CONTRIBUINTE']
        ? {
            contributor_price: product['PREÇO PARA 4% DE ICMS - CONTRIBUINTE'],
          }
        : { contributor_price: 0 }),
      ...(product['PREÇO - ISENTO'] === 'SOB CONSULTA'
        ? { exempt_price: 0 }
        : { exempt_price: Number(product['PREÇO - ISENTO']) }),
      ...(product.OBSERVAÇÕES ? { note: product.OBSERVAÇÕES } : { note: '' }),
      ...(product.OUTLET ? { outlet: true } : { outlet: false }),
    }));
  }

  private fileToJson(file: Buffer): IProductsJson[] {
    const sheetsData = xlsx.read(file);
    if (sheetsData) {
      return xlsx.utils.sheet_to_json(
        sheetsData.Sheets[sheetsData.SheetNames[0]],
      );
    }
    throw new HttpError(500, 'Não foi possível converter a tabela.');
  }
}
