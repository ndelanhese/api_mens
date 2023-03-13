import DeleteProductInputData from '@app/src/Products/Application/Dtos/DeleteProductInputData';
import { Request } from 'express';
import { IProductResponse } from './DeleteProductFactory.types';

export default class DeleteProductFactory {
  static fromRequest(req: Request, currentValue: IProductResponse) {
    return new DeleteProductInputData(
      currentValue.id,
      currentValue.manufacturer_slug,
      req.body.type,
      req.body.part_number,
      req.body.description,
      req.body.currency,
      req.body.contributor_price,
      req.body.outlet,
      req.body.exempt_price,
      req.body.note,
    );
  }
}
