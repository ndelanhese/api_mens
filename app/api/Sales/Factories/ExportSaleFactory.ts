import ExportSalesInputData from '@app/src/Sales/Application/Dtos/ExportSaleInputData';
import { Request } from 'express';

export default class ExportSaleFactory {
  static fromRequest(req: Request) {
    return new ExportSalesInputData(
      req.query.initial_date ? String(req.query.initial_date) : undefined,
      req.query.final_date ? String(req.query.final_date) : undefined,
      req.query.status ? String(req.query.status) : undefined,
      req.query.customers_id ? String(req.query.customers_id) : undefined,
      req.query.users_id ? String(req.query.users_id) : undefined,
      req.query.products_ids ? String(req.query.products_ids) : undefined,
      req.query.suppliers_ids ? String(req.query.suppliers_ids) : undefined,
    );
  }
}
