import { Request } from 'express';

export default class PaginationFactory {
  static fromRequest(req: Request) {
    const perPage = req.query.per_page;
    const page = req.query.page;
    const direction = req.query.direction;
    const order = req.query.order;
    return {
      page: page ? Number(page) : 1,
      perPage: perPage ? Number(perPage) : 15,
      direction: direction ? String(direction) : 'ASC',
      order: order ? String(order) : 'id',
    };
  }
}
