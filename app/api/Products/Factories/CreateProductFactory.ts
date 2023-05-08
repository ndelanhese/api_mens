import CreateProductInputData from '@app/src/Products/Application/Dtos/CreateProductInputData';
import { Request } from 'express';

export default class CreateProductFactory {
  static fromRequest(req: Request) {
    return new CreateProductInputData(
      req.body.name,
      req.body.description,
      req.body.price,
      req.body.quantity,
      req.body.category_id,
      req.body.brand_id,
      req.body.supplier_id,
      req.body.purchase_price,
      req.body.size,
      req.body.color,
    );
  }
}
