import UpdateProductStockInputData from '@app/src/Products/Application/Dtos/UpdateProductStockInputData';
import { Request } from 'express';

export default class UpdateProductStockFactory {
  static fromRequest(req: Request) {
    return new UpdateProductStockInputData(
      req.body.quantity,
      Number(req.params.id),
      req.body.status,
    );
  }
}
