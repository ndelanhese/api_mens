import ExportProductsInputData from '@app/src/Products/Application/Dtos/ExportProductsInputData';
import { getNameFromURL } from '@app/src/Shared/Domain/Utils/String';
import { Request } from 'express';

export default class ExportProductsFactory {
  static fromRequest(req: Request) {
    const manufacturer_slug = getNameFromURL(req.url);
    return new ExportProductsInputData(manufacturer_slug);
  }
}
