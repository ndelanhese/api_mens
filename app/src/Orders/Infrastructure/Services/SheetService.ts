import { resizeColumns } from '@app/src/Shared/Infrastructure/Services/Sheets/SheetUtils';
import { formatCpf } from '@app/src/Shared/Infrastructure/Utils/CpfCnpjFormatter';
import { getDateTime } from '@app/src/Shared/Infrastructure/Utils/Date';
import xlsx from 'xlsx';

import Order from '../../Domain/Entities/Order';
import Product from '../../Domain/Entities/Product';
import { OrderStatusTypes } from '../../Domain/Enums/OrderStatusTypes';
import { OrderStatusTypesOptions } from '../../Domain/Enums/OrderStatusTypes.types';

export default class SheetService {
  public dataToSheet(sale: Order[]): Buffer {
    const workSheetName = 'SheetJS';
    const rowsData = sale.map(item => ({
      CÓDIGO: item.getId(),
      DATA: this.prepareDate(item.getDate()),
      CLIENTE: this.prepareClienteName(item.getCustomer().getName()),
      CPF: this.prepareCpf(item.getCustomer().getCpf()),
      PRODUTOS: this.prepareProducts(item.getProducts()),
      STATUS: this.prepareStatus(item.getStatus()),
      OBSERVAÇÃO: item.getObservation(),
      DESCRIÇÃO: item.getDescription(),
    }));
    const workSheet: xlsx.WorkSheet = xlsx.utils.json_to_sheet(rowsData);
    const workSheetPrepared = resizeColumns(workSheet);
    const workBook: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workBook, workSheetPrepared, workSheetName);
    return xlsx.write(workBook, { type: 'buffer', bookType: 'xlsx' });
  }

  private prepareDate(date: Date) {
    return getDateTime(date);
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

  private prepareCpf(cpf: string) {
    return formatCpf(cpf);
  }

  private prepareProducts(products?: Product[]) {
    if (products) {
      const formattedProducts = products.map(
        product => `${product.getQuantity()} - ${product.getName()}`,
      );
      return formattedProducts.join(', ');
    }
  }

  private prepareStatus(status?: string) {
    if (status && OrderStatusTypes.isValid(status)) {
      const statusType = OrderStatusTypes.from(
        status as OrderStatusTypesOptions,
      );
      return statusType.label();
    }
    return null;
  }
}
