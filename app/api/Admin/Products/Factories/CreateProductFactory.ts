import CreateProductInputData from '@app/src/Products/Application/Dtos/CreateProductInputData';
import {
  getNameFromURL,
  getSlugName,
} from '@app/src/Shared/Domain/Utils/String';
import { Request } from 'express';

export default class CreateProductFactory {
  static fromRequest(req: Request) {
    const manufacturer_slug = getNameFromURL(req.url);
    return new CreateProductInputData(
      getSlugName(manufacturer_slug),
      req.body.type,
      req.body.part_number,
      req.body.description,
      req.body.currency,
      req.body.contributor_price,
      req.body.outlet,
      req.body.exempt_price || 0,
      req.body.note,
    );
  }
}
