import { getNameFromURL } from '@app/src/Shared/Domain/Utils/String';
import ImportProductsInputData from '@app/src/Products/Application/Dtos/ImportProductsInputData';
import HttpError from '@exceptions/HttpError';
import { Request } from 'express';

export default class ImportProductsFactory {
  static fromRequest(req: Request) {
    const table = req?.files?.file;
    const manufacturer_slug = getNameFromURL(req.url);

    if (!table || Array.isArray(table)) {
      throw new HttpError(400, 'Arquivo inválido.');
    }

    return new ImportProductsInputData(table.data, manufacturer_slug);
  }
}
