import { resizeColumns } from '@app/src/Shared/Infrastructure/Services/Sheets/SheetUtils';
import xlsx from 'xlsx';

import Product from '../../Domain/Entities/Product';

export default class SheetService {
  public dataToSheet(products: Product[]): Buffer {
    const workSheetName = 'SheetJS';
    const rowsData = products.map(item => ({
      PART_NUMBER: item.getPartNumber(),
      NOME: item.getName(),
      DESCRIÇÃO: item.getDescription,
      'PREÇO DE ORIGEM': item.getPurchasePrice(),
      PREÇO: item.getPrice(),
      TAMANHO: item.getSize(),
      COR: item.getColor(),
      QUANTIDADE: item.getQuantity(),
      CATEGORIA: item.getCategory()?.getName(),
      MARCA: item.getBrand()?.getName(),
      FORNECEDOR: item.getSupplier()?.getCorporateName(),
      STATUS: item.getStatus(),
    }));
    const workSheet: xlsx.WorkSheet = xlsx.utils.json_to_sheet(rowsData);
    const workSheetPrepared = resizeColumns(workSheet);
    const workBook: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workBook, workSheetPrepared, workSheetName);
    return xlsx.write(workBook, { type: 'buffer', bookType: 'xlsx' });
  }
}
