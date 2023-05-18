import getDate from '@app/src/Shared/Domain/Utils/Date';

import Sale from '../../Domain/Entities/Sale';
import SalesRepository from '../../Infrastructure/Repositories/SalesRepository';
import SheetService from '../../Infrastructure/Services/SheetService';
import ExportSalesInputData from '../Dtos/ExportSaleInputData';

export default class ExportSaleAction {
  async execute(input: ExportSalesInputData) {
    const initial_date = !input.initial_date
      ? undefined
      : getDate(input.initial_date);
    const final_date = !input.final_date
      ? undefined
      : getDate(input.final_date);
    const status = this.parseToStringArray(input.status);
    const customers_id = this.parseToNumberArray(input.customers_id);
    const users_id = this.parseToNumberArray(input.users_id);
    const products_ids = this.parseToNumberArray(input.products_ids);
    const suppliers_ids = this.parseToNumberArray(input.suppliers_ids);
    const saleRepository = new SalesRepository();
    const sales = await saleRepository.export({
      initial_date,
      final_date,
      status,
      customers_id,
      users_id,
      products_ids,
      suppliers_ids,
    });
    return this.convertXlsx(sales);
  }
  private parseToStringArray(value: string | undefined) {
    if (value !== 'undefined' && value) {
      if (value.includes(',')) {
        return value.split(',');
      }
      return [value];
    }
    return [];
  }

  private parseToNumberArray(value: string | undefined) {
    if (value !== 'undefined' && value) {
      if (value.includes(',')) {
        return value.split(',').map(v => parseInt(v));
      }
      return [parseInt(value)];
    }
    return [];
  }

  private convertXlsx(sale: Sale[]) {
    const sheetService = new SheetService();
    return sheetService.dataToSheet(sale);
  }
}
