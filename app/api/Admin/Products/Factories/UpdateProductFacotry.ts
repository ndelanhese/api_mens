import UpdateProductInputData from '@app/src/Products/Application/Dtos/UpdateProductInputData';
import { Request } from 'express';
import { IProduct } from './UpdateProductFactory.types';
import Product from '@app/src/Products/Domain/Entities/Product';

export default class UpdateProductFactory {
  static fromRequest(req: Request, manufacturer_slug: string) {
    return new UpdateProductInputData(
      manufacturer_slug,
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
  static currentValueFromRequest(currentValue: IProduct) {
    return new Product(
      currentValue.manufacturer_slug,
      currentValue.type,
      currentValue.part_number,
      currentValue.description,
      currentValue.currency,
      currentValue.contributor_price,
      currentValue.outlet,
      currentValue.note,
      currentValue.exempt_price,
      currentValue.id,
    );
  }
}
