import getDate from '@app/src/Shared/Infrastructure/Utils/Date';
import { Request } from 'express';

export default class ListProductsFactory {
  static fromRequest(req: Request) {
    return {
      ...(req.query.initial_date
        ? { initial_date: getDate(String(req.query.initial_date)) }
        : undefined),
      ...(req.query.final_date
        ? { final_date: getDate(String(req.query.final_date)) }
        : undefined),
      ...(req.query.initial_value
        ? {
            initial_value: Number(req.query.initial_value),
          }
        : undefined),
      ...(req.query.final_value
        ? {
            final_value: Number(req.query.final_value),
          }
        : undefined),
    };
  }
}
