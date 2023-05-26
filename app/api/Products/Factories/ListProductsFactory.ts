import { Request } from 'express';

export default class ListProductsFactory {
  static fromRequest(req: Request) {
    return {
      ...(req.query.category_id
        ? { category_id: Number(req.query.category_id) }
        : null),
      ...(req.query.brand_id ? { brand_id: Number(req.query.brand_id) } : null),
      ...(req.query.supplier_id
        ? { supplier_id: Number(req.query.supplier_id) }
        : null),
      ...(req.query.initial_value
        ? { initial_value: Number(req.query.initial_value) }
        : null),
      ...(req.query.final_value
        ? { final_value: Number(req.query.final_value) }
        : null),
      ...(req.query.name ? { name: String(req.query.name) } : null),
      ...(req.query.description
        ? { description: String(req.query.description) }
        : null),
      ...(req.query.part_number
        ? { part_number: String(req.query.part_number) }
        : null),
    };
  }
}
