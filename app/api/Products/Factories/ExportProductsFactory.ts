import ExportProductInputData from '@app/src/Products/Application/Dtos/ExportProductInputData';
import { Request } from 'express';

export default class ExportProductsFactory {
  static fromRequest(req: Request) {
    return new ExportProductInputData(
      req.query.categories_id ? String(req.query.categories_id) : undefined,
      req.query.brands_id ? String(req.query.brands_id) : undefined,
      req.query.initial_value ? Number(req.query.initial_value) : undefined,
      req.query.final_value ? Number(req.query.final_value) : undefined,
    );
  }
}
