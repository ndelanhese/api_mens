import getDate from '@app/src/Shared/Infrastructure/Utils/Date';
import { Request } from 'express';

export default class ListFactory {
  static fromRequest(req: Request) {
    const status = req.query.status;
    const initial_date = req.query.initial_date;
    const final_date = req.query.final_date;
    const initial_value = req.query.initial_value;
    const final_value = req.query.final_value;
    return {
      status: status ? String(status) : undefined,
      initial_date: initial_date ? getDate(String(initial_date)) : undefined,
      final_date: final_date ? getDate(String(final_date)) : undefined,
      initial_value: initial_value ? Number(initial_value) : undefined,
      final_value: final_value ? Number(final_value) : undefined,
    };
  }
}
