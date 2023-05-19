import { getDateString } from '@app/src/Shared/Domain/Utils/Date';
import { resizeColumns } from '@app/src/Shared/Infrastructure/Services/Sheets/SheetUtils';
import xlsx from 'xlsx';

import Sale from '../../Domain/Entities/Sale';

export default class SheetService {
  public dataToSheet(products: Sale[]): Buffer {
    const workSheetName = 'SheetJS';
    const rowsData = products.map(item => ({
      DATA: getDateString(item.getDate()),
      //TODO -> Colocar os outros dados de data
    }));
    const workSheet: xlsx.WorkSheet = xlsx.utils.json_to_sheet(rowsData);
    const workSheetPrepared = resizeColumns(workSheet);
    const workBook: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workBook, workSheetPrepared, workSheetName);
    return xlsx.write(workBook, { type: 'buffer', bookType: 'xlsx' });
  }
}
