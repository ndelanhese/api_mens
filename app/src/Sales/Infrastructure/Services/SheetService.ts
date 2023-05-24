import { getDateString } from '@app/src/Shared/Domain/Utils/Date';
import { resizeColumns } from '@app/src/Shared/Infrastructure/Services/Sheets/SheetUtils';
import xlsx from 'xlsx';

import Sale from '../../Domain/Entities/Sale';

export default class SheetService {
  public dataToSheet(products: Sale[]): Buffer {
    const workSheetName = 'SheetJS';
    const rowsData = products.map(item => ({
      CÓDIGO: item.getId(),
      DATA: this.prepareDate(item.getDate()),
      CLIENTE: this.prepareClienteName(item.getCustomer().getName()),
      //TODO -> Colocar os outros dados de data
    }));
    const workSheet: xlsx.WorkSheet = xlsx.utils.json_to_sheet(rowsData);
    const workSheetPrepared = resizeColumns(workSheet);
    const workBook: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workBook, workSheetPrepared, workSheetName);
    return xlsx.write(workBook, { type: 'buffer', bookType: 'xlsx' });
  }

  private prepareDate(date: Date) {
    return getDateString(date);
  }
  private prepareClienteName(customerName: string) {
    const names: string[] = customerName.split(' ');

    if (names.length >= 2) {
      const firstName: string = names[0];
      const lastName: string = names[names.length - 1];

      const initials: string = names
        .slice(1, -1)
        .map((nome: string) => `${nome.charAt(0).toUpperCase()}.`)
        .join(' ');

      return `${firstName} ${initials} ${lastName}`;
    }

    return customerName;
  }
}
