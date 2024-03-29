import UpdateProductInputData from '@app/src/Products/Application/Dtos/UpdateProductInputData';
import Product from '@app/src/Products/Domain/Entities/Product';
import { Request } from 'express';

import { IProduct } from './UpdateProductFactory.types';

export default class UpdateProductFactory {
  static fromRequest(req: Request) {
    return new UpdateProductInputData(
      req.body.part_number,
      req.body.name,
      req.body.description,
      req.body.price,
      req.body.quantity,
      req.body.category_id,
      req.body.brand_id,
      req.body.supplier_id,
      req.body.status,
      req.body.purchase_price,
      req.body.size,
      req.body.color,
    );
  }
  static currentValueFromRequest(currentValue: IProduct) {
    return new Product(
      currentValue.name,
      currentValue.description,
      currentValue.price,
      currentValue.quantity,
      currentValue.status,
      currentValue.part_number,
      undefined,
      undefined,
      undefined,
      currentValue.purchase_price,
      currentValue.size,
      currentValue.color,
      currentValue.id,
    );
  }
}
