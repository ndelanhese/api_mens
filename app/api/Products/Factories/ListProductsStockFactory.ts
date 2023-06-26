import { Request } from 'express';

export default class ListProductsStockFactory {
  static fromRequest(req: Request) {
    return {
      ...(req.query.status
        ? { status: String(req.query.status) }
        : { status: 'active' }),
      ...(req.query.limit ? { limit: Number(req.query.limit) } : { limit: 5 }),
    };
  }
}
