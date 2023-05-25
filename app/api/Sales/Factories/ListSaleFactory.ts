import getDate from '@app/src/Shared/Domain/Utils/Date';
import { Request } from 'express';

export default class ListSaleFactory {
  static fromRequest(req: Request) {
    return {
      ...(req.query.initial_date
        ? { initial_date: getDate(String(req.query.initial_date)) }
        : undefined),
      ...(req.query.final_date
        ? { final_date: getDate(String(req.query.final_date)) }
        : undefined),
      ...(req.query.status
        ? { status: this.parseToStringArray(String(req.query.status)) }
        : undefined),
      ...(req.query.customers_id
        ? {
            customers_id: this.parseToNumberArray(
              String(req.query.customers_id),
            ),
          }
        : undefined),
      ...(req.query.users_id
        ? { users_id: this.parseToNumberArray(String(req.query.users_id)) }
        : undefined),
    };
  }
  private static parseToStringArray(value: string | undefined) {
    if (value !== 'undefined' && value) {
      if (value.includes(',')) {
        return value.split(',');
      }
      return [value];
    }
    return [];
  }

  private static parseToNumberArray(value: string | undefined) {
    if (value !== 'undefined' && value) {
      if (value.includes(',')) {
        return value.split(',').map(v => parseInt(v));
      }
      return [parseInt(value)];
    }
  }
}
